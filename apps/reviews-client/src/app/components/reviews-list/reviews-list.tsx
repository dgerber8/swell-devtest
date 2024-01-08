import { Company, Review, User } from '@prisma/client';
import StarIcon from '@mui/icons-material/Star';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const styles = {
	title: {
		fontSize: '25pt',
		marginBottom: '10px',
		paddingTop: '10px',
	},
	header: {
		display: 'flex',
		flex_direction: 'row',
	},
	card: {
		margin: 'auto',
		marginTop: '5px',
	},
	reviewerInfo: {
		display: 'flex',
		alignItems: 'flex-end',
	},
	rating: {
		display: 'flex',
		justifyContent: 'right',
		flexGrow: 1,
		marginRight: '15px',
	},
};

/* eslint-disable-next-line */
export interface ReviewsListProps {}

export interface ReviewData extends Review {
	company: Company;
	user: User;
}

export function ReviewsList(props: ReviewsListProps) {
	const [reviews, setReviews] = useState<ReviewData[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [openSnackbar, setOpenSnackbar] = React.useState(false);

	// Retrieves review data via the /reviews endpoint on page load
	useEffect(() => {
		fetch('api/reviews')
			.then((response) => response.json())
			.then((data) => {
				setReviews(data.reviews);
				console.log(JSON.stringify(data.reviews));
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setOpenSnackbar(true);
				setIsLoading(false);
			});
	}, []);

	const handleClose = () => {
		setOpenSnackbar(false);
	};

	return (
		<>
			<Snackbar
				open={openSnackbar}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					Error retrieving review data
				</Alert>
			</Snackbar>

			<Typography style={styles.title} variant="h1">
				{`Reviews:`}
			</Typography>
			<hr></hr>

			{reviews.length || isLoading ? (
				<>
					{reviews.map((review, index) => {
						return (
							<Card
								style={styles.card}
								sx={{ backgroundColor: index % 2 ? '#e8e8e8' : 'white' }}
								variant="outlined"
							>
								<CardContent>
									<div style={styles.header}>
										<div>
											<div style={styles.reviewerInfo}>
												<Typography sx={{ fontSize: '14pt' }} variant="h3">
													{`${review.user.firstName} ${review.user.lastName}`}
												</Typography>
												<Typography
													sx={{ fontSize: '8pt', marginLeft: '5px' }}
													color="text.secondary"
													component="div"
												>
													{new Date(review.createdOn).toLocaleString('en-US', {
														dateStyle: 'short',
														timeStyle: 'short',
													})}
												</Typography>
											</div>
											<Typography sx={{ mb: review.reviewText ? 1.5 : 0 }} color="text.secondary">
												{review.company.name}
											</Typography>
										</div>
										<div style={styles.rating}>
											<Typography sx={{ color: '#e11979', fontSize: '20pt', fontWeight: 'bold' }}>
												{review.rating}
											</Typography>
											<StarIcon sx={{ color: '#e11979', fontSize: '30pt' }} />
										</div>
									</div>
									<Typography variant="body1">{review.reviewText}</Typography>
								</CardContent>
							</Card>
						);
					})}
				</>
			) : (
				<Typography sx={{ fontSize: '14pt' }}>There are currently no reviews</Typography>
			)}
		</>
	);
}

export default ReviewsList;
