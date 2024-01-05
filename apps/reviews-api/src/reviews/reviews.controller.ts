import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsCountResponse, ReviewsResponse } from './reviews.types';

@Controller('reviews')
export class ReviewsController {
	constructor(private reviewsService: ReviewsService) {}

	@Get('/')
	async getReviews(): Promise<string> {
		const reviews = await this.reviewsService.getReviews();
		const testCompany = { id: 1, name: 'comp1' };
		const testUser = { id: 1, firstName: 'fn', lastName: 'ln', email: 'rub@dub.dub' };
		const testResp = [{ company: testCompany, user: testUser }];
		return JSON.stringify(testResp);
	}

	@Get('/count')
	async getReviewsCount(): Promise<ReviewsCountResponse> {
		const reviewsCount = await this.reviewsService.getReviewsCount();
		return { reviewsCount };
	}
}
