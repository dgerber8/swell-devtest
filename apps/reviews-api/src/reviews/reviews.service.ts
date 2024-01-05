import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ReviewsService {
	constructor(private prisma: DatabaseService) {}

	getReviews() {
		return this.prisma.review.findMany();
	}

	getReviewsCount() {
		return this.prisma.review.count();
	}
}
