import { render } from '@testing-library/react';
import App from './app';

describe('App', () => {
	beforeEach(() => {
		global.fetch = jest.fn();
	});

	it('should render successfully', () => {
		jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve({ data: [] }),
			} as Response),
		);
		const { baseElement } = render(<App />);

		expect(baseElement).toBeTruthy();
	});
});
