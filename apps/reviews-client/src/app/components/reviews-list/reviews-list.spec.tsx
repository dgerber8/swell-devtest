import { render, screen } from '@testing-library/react';
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
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList reviews={[]} />);
		expect(baseElement).toBeTruthy();
	});

	/*
		- return multiple reviews
		- Check expected number of cards got rendered
	*/
	it('should render list of reviews', () => {
		render(<ReviewsList reviews={[testReview, testReviewWithMessage]} />);
		const latestStoriesH2 = screen.getAllByTestId('review-card');
		console.log(`latestStoriesH2:\n${JSON.stringify(latestStoriesH2.length)}`);
		expect(latestStoriesH2.length).toBe(2);
	});

	/*
		- return empty list
		- Check no reviews message got rendered
	*/
	it('should display message if no reviews are found', () => {});

	/*
		- return one textless and on w/ text review
		- Check if review text test id shows for 1 card and not the other
	*/
	it('should display the review text if provided', () => {});
});
