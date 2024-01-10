import { render, screen, within } from '@testing-library/react';
import ReviewsList from './reviews-list';

const testReview = {
	id: '123',
	rating: 5,
	createdOn: '2022-08-30T15:59:19Z',
	reviewerId: '321',
	user: {
		id: '321',
		firstName: 'John',
		lastName: 'Doe',
		email: 'test@test.test',
	},
	companyId: '222',
	company: {
		id: '222',
		name: 'Company Inc.',
	},
	reviewText: '',
};
const testReviewWithMessage = {
	id: '223',
	rating: 3,
	createdOn: '2022-09-30T15:59:19Z',
	reviewerId: '322',
	user: {
		id: '322',
		firstName: 'Johnny',
		lastName: 'Deer',
		email: 'test2@test.test',
	},
	companyId: '222',
	company: {
		id: '222',
		name: 'Company Inc.',
	},
	reviewText: 'This is my review.',
};

describe('ReviewsList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList reviews={[]} />);
		expect(baseElement).toBeTruthy();
	});

	it('should render list of reviews', () => {
		render(<ReviewsList reviews={[testReview, testReviewWithMessage]} />);

		const reviewCards = screen.getAllByTestId('review-card');
		expect(reviewCards.length).toBe(2);

		expect(
			within(reviewCards[0]).getByText(testReview.user.firstName + ' ' + testReview.user.lastName),
		).toBeInTheDocument();
		expect(
			within(reviewCards[1]).getByText(
				testReviewWithMessage.user.firstName + ' ' + testReviewWithMessage.user.lastName,
			),
		).toBeInTheDocument();

		expect(screen.queryByText('There are currently no reviews.')).toBeNull();
	});

	it('should display message if no reviews are found', () => {
		render(<ReviewsList reviews={[]} />);

		const reviewCards = screen.queryByTestId('review-card');
		expect(reviewCards).toBeNull();

		expect(screen.getByText('There are currently no reviews.')).toBeInTheDocument();
	});

	it('should display the review text if provided', () => {
		render(<ReviewsList reviews={[testReview, testReviewWithMessage]} />);

		const reviewCards = screen.getAllByTestId('review-card');

		expect(within(reviewCards[0]).queryByTestId('review-text')).toBeNull();
		expect(within(reviewCards[1]).getByTestId('review-text')).toBeInTheDocument();
		expect(within(reviewCards[1]).getByText(testReviewWithMessage.reviewText)).toBeInTheDocument();
	});
});
