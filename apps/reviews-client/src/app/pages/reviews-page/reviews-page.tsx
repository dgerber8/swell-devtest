import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import WebFont from 'webfontloader';
import Header from '../../components/header/header';
import ReviewsList from '../../components/reviews-list/reviews-list';
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { getReviews } from '../../utils/reviews-utils';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const styles = {
	title: {
		fontSize: '25pt',
		marginBottom: '10px',
		paddingTop: '10px',
	},
};

export function ReviewsPage() {
	const [reviews, setReviews] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const loadReviews = async () => {
			try {
				const reviewData = await getReviews();
				setReviews(reviewData.reviews);
			} catch (e: any) {
				console.error(e);
				setError(e);
			}

			setIsLoading(false);
		};

		loadReviews();
	}, []);

	const handleClose = () => {
		setError(undefined);
	};

	return (
		<>
			<Typography style={styles.title} variant="h1">
				Reviews:
			</Typography>
			<hr></hr>

			{isLoading ? (
				<Typography sx={{ fontSize: '14pt' }} data-testid="loading-msg">
					Loading review data...
				</Typography>
			) : (
				<ReviewsList reviews={reviews} />
			)}

			<Snackbar
				open={!!error}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					{`Error retrieving review data. Reload the page to try again.`}
				</Alert>
			</Snackbar>
		</>
	);
}

export default ReviewsPage;
