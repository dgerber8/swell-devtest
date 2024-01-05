import Alert from '@mui/material/Alert';
import TaskIcon from '@mui/icons-material/Task';
import React, { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export interface ReviewsListProps {}

export function ReviewsList(props: ReviewsListProps) {
	const [reviews, setReviews] = useState([]);
	const [reviewCount, setReviewCount] = useState([]);

	useEffect(() => {
		fetch('api/reviews/count')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setReviewCount(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	useEffect(() => {
		fetch('api/reviews')
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setReviews(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<Alert severity="error" icon={<TaskIcon />}>
			{`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\ncount: ${JSON.stringify(
				reviewCount,
			)}\nreviews: ${JSON.stringify(reviews)}\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`}
		</Alert>
	);
}

export default ReviewsList;
