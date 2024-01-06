import { Company, Review, User } from '@prisma/client';
import StarIcon from '@mui/icons-material/Star';
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

/* eslint-disable-next-line */
export interface ReviewsListProps {}

export interface ReviewData extends Review {
	company: Company;
	user: User;
}

const title = {
	fontSize: '25pt',
	marginBottom: '10px',
	paddingTop: '10px',
};
const header = {
	display: 'flex',
	flex_direction: 'row',
};
const card = {
	margin: 'auto',
	marginTop: '5px',
};
const reviewerInfo = {
	display: 'flex',
	alignItems: 'flex-end',
};
const rating = {
	display: 'flex',
	justifyContent: 'right',
	flexGrow: 1,
	marginRight: '15px',
};

export function ReviewsList(props: ReviewsListProps) {
	const [reviews, setReviews] = useState<ReviewData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('api/reviews')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.reviews);
				setReviews(data.reviews);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<>
			<Typography style={title} variant="h1">
				{`Reviews:`}
			</Typography>
			<hr></hr>
			{reviews.length || isLoading ? (
				<>
					{reviews.map((review, index) => {
						return (
							<Card
								style={card}
								sx={{ backgroundColor: index % 2 ? '#e8e8e8' : 'white' }}
								variant="outlined"
							>
								<CardContent>
									<div style={header}>
										<div>
											<div style={reviewerInfo}>
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
										<div style={rating}>
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
