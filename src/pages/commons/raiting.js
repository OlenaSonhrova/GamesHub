import { StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';

import { SetGameRating } from '../../api/api';

const RatingGame = ({ idGame, userRating }) => {


	const ratingCompleted = (rating) => {
		console.log("Rating is: " + rating);
		SetGameRating(rating, idGame);
	};

	return (
		<View style={styles.headRaiting}>
			<Rating
				type='star'
				ratingCount={5}
				imageSize={35}
				tintColor='#EEC9B0'
				startingValue={userRating}
				onFinishRating={ratingCompleted}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	headRaiting: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10,
	},
});

export default RatingGame;
