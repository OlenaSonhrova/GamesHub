import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Rating } from 'react-native-ratings';

import { SetGameRating } from '../../api/api';

const RatingGame = ({ idGame, userRating, checkChangeUserRating, navigation, offline }) => {


	const ratingCompleted = async (rating) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		checkChangeUserRating(rating);
		const respons = await SetGameRating(idGame, rating, navigation);
		if (respons?.status !== 200) {
			Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
			return;
		};
	};

	const handleStartRating = () => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
		}
	};

	return (
		<View style={styles.headRaiting}>
			<Pressable onPress={handleStartRating}>
				<Rating
					type='star'
					ratingCount={5}
					imageSize={35.0}
					tintColor='#EEC9B0'
					startingValue={userRating}
					onFinishRating={ratingCompleted}
					readonly={offline}
				/>
			</Pressable>

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
