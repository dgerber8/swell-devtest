import { render } from '@testing-library/react';
import ReviewsList from './reviews-list';

describe('ReviewsList', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<ReviewsList />);
		expect(baseElement).toBeTruthy();
	});
	/*
		Steps:
		- mock the endpoint to return reviews
		- Check cards got rendered?
	*/
	it.todo('should render list of reviews');

	/*
		Steps:
		- mock the endpoint to return empty list
		- Check message got rendered?
	*/
	it.todo('should display message if no reviews are found');

	/*
		- mock the endpoint to return a review w/ text
		- Check if text got rendered in a card?
	*/
	it.todo('should display the review text if provided');
});
