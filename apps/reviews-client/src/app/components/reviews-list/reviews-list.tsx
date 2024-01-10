import { Company, Review, User } from '@prisma/client';
import StarIcon from '@mui/icons-material/Star';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const styles = {
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

interface ReviewData extends Review {
	company: Company;
	user: User;
}

/* eslint-disable-next-line */
export interface ReviewsListProps {
	reviews: ReviewData[];
}

export function ReviewsList(props: ReviewsListProps) {
	const { reviews } = props;

	return (
		<>
			{reviews.map((review, index) => (
				<Card
					style={styles.card}
					sx={{ backgroundColor: index % 2 ? '#e8e8e8' : 'white' }}
					variant="outlined"
					data-testid="review-card"
					key={review.id}
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
						<Typography variant="body1" data-testid="review-text">
							{review.reviewText}
						</Typography>
					</CardContent>
				</Card>
			))}
		</>
	);
}

export default ReviewsList;
