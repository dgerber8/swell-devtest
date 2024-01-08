import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { DatabaseModule } from '../database/database.module';
import { DatabaseService } from '../database/database.service';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

const containsAllFields = (obj, fields) => fields.every((field) => obj.hasOwnProperty(field));

describe('ReviewsController', () => {
	const user1Id = 'user-1';
	const user2Id = 'user-2';
	const company1Id = 'company-1';
	const company2Id = 'company-2';
	const reviewIds = ['1', '2', '3'];
	const userFields = ['firstName', 'lastName', 'email'];
	const companyFields = ['name'];

	let app: INestApplication;
	let prisma: DatabaseService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [DatabaseModule],
			controllers: [ReviewsController],
			providers: [ReviewsService],
		}).compile();

		app = module.createNestApplication();
		prisma = module.get<DatabaseService>(DatabaseService);
		await app.init();

		await prisma.$transaction([
			prisma.user.create({
				data: { id: user1Id, email: 'user1@example.com' },
			}),
			prisma.user.create({
				data: { id: user2Id, email: 'user2@example.com' },
			}),
			prisma.company.create({
				data: { id: company1Id, name: 'Test Company' },
			}),
			prisma.company.create({
				data: { id: company2Id, name: 'Test Company 2' },
			}),
			prisma.review.create({
				data: {
					id: reviewIds[0],
					reviewerId: user1Id,
					companyId: company1Id,
					createdOn: '2020-01-03T00:00:00.000Z',
				},
			}),
			prisma.review.create({
				data: {
					id: reviewIds[1],
					reviewerId: user2Id,
					companyId: company1Id,
					createdOn: '2022-01-02T00:00:00.000Z',
				},
			}),
			prisma.review.create({
				data: {
					id: reviewIds[2],
					reviewerId: user2Id,
					companyId: company2Id,
					createdOn: '2021-01-04T00:00:00.000Z',
				},
			}),
		]);
	});

	afterEach(async () => {
		await prisma.review.deleteMany({ where: {} });
		await prisma.user.deleteMany({ where: {} });
		await prisma.company.deleteMany({ where: {} });
	});

	describe('getReviewsCount()', () => {
		it('should return number of reviews', async () => {
			const response = await request(app.getHttpServer()).get('/reviews/count');
			expect(response.status).toBe(200);
			expect(response.body.reviewsCount).toBe(3);
		});
	});

	describe('getReviews()', () => {
		it('should fetch all reviews successfully', async () => {
			const response = await request(app.getHttpServer()).get('/reviews');

			expect(response.status).toBe(200);

			const containsExpectedIds = reviewIds.every((expectedId) =>
				response.body.reviews.some((review) => review.id === expectedId),
			);

			expect(containsExpectedIds).toBe(true);
		});

		it('should fetch reviews in descending order by createdOn date', async () => {
			const response = await request(app.getHttpServer()).get('/reviews');

			const isSortedByDateDesc = response.body.reviews.every((review, index, reviews) => {
				if (index === 0) return true;

				const currDate = new Date(review.createdOn);
				const prevDate = new Date(reviews[index - 1].createdOn);

				return currDate <= prevDate;
			});

			expect(isSortedByDateDesc).toBe(true);
		});

		it('should include user data with review', async () => {
			const response = await request(app.getHttpServer()).get('/reviews');

			const hasUserData = response.body.reviews.every((review) => {
				if (!review.hasOwnProperty('user')) return false;
				return containsAllFields(review.user, userFields);
			});

			expect(hasUserData).toBe(true);
		});

		it('should include company data with review', async () => {
			const response = await request(app.getHttpServer()).get('/reviews');

			const hasCompanyData = response.body.reviews.every((review) => {
				if (!review.hasOwnProperty('company')) return false;
				return containsAllFields(review.company, companyFields);
			});

			expect(hasCompanyData).toBe(true);
		});
	});
});
