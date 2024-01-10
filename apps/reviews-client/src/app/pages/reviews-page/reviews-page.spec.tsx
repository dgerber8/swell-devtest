import { render, screen, waitFor } from '@testing-library/react';
import ReviewsPage from './reviews-page';
import { getReviews } from '../../utils/reviews-utils';

jest.mock('../../utils/reviews-utils');

function delay(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

describe('ReviewsPage', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render successfully', async () => {
		jest.mocked(getReviews).mockImplementation(() => Promise.resolve({ reviews: [] }));

		const { baseElement } = render(<ReviewsPage />);
		expect(baseElement).toBeTruthy();
	});

	it('should show loading message while waiting for getReviews to resolve', async () => {
		jest.mocked(getReviews).mockImplementation(async () => {
			await delay(100);
			return Promise.resolve({ reviews: [] });
		});

		render(<ReviewsPage />);

		const loadingText = screen.getByText('Loading review data...');

		expect(loadingText).toBeInTheDocument();
		await delay(200);
		expect(loadingText).not.toBeInTheDocument();
	});

	it('should show error message when fetch is unsuccessful', async () => {
		jest.mocked(getReviews).mockImplementation(async () => {
			throw new Error('Something went wrong');
		});

		render(<ReviewsPage />);

		await waitFor(() => {
			expect(
				screen.getByText('Error retrieving review data. Reload the page to try again.'),
			).toBeInTheDocument();
		});
	});
});
