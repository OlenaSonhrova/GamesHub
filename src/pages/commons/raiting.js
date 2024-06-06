import { Alert, StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';

import { SetGameRating } from '../../api/api';

const RatingGame = ({ idGame, userRating, navigation }) => {

	const ratingCompleted = async (rating) => {
		const respons = await SetGameRating(idGame, rating, navigation);
		if (respons?.status !== 200) {
			Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
			return;
		};
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
