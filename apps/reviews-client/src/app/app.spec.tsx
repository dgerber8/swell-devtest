import { render, act } from '@testing-library/react';
import App from './app';

describe('App', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	it('should render successfully', async () => {
		const promise = Promise.resolve({
			json: () => Promise.resolve({ reviews: [] }),
		} as Response);
		jest.spyOn(global, 'fetch').mockImplementationOnce(() => promise);

		const { baseElement } = render(<App />);
		expect(baseElement).toBeTruthy();

		await act(() => promise);
	});
});
