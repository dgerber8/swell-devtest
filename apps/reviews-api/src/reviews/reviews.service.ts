import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	getReviews() {
		return this.prisma.review.findMany({
			orderBy: [
				{
					createdOn: 'desc',
				},
			],
			include: {
				user: true,
				company: true,
			},
		});
	}

	getReviewsCount() {
		return this.prisma.review.count();
	}
}
