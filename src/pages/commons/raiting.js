import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { useState } from 'react';
import Rating from 'react-native-easy-rating';

import { SetGameRating } from '../../api/api';




const RatingGame = ({ idGame, userRating, checkChangeUserRating, navigation, offline }) => {

	const [ratingNow, setRatingNow] = useState(userRating);

	const starBraun = require('../../image/starBraun.png');
	const starYelow = require('../../image/starYelow.png');

	const ratingCompleted = async (rating) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		checkChangeUserRating(rating);

		if (rating === ratingNow) {
			setRatingNow(0);
			const respons = await SetGameRating(idGame, 0, navigation);
			if (respons?.status !== 200) {
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return;
			};
		} else {
			setRatingNow(rating);
			const respons = await SetGameRating(idGame, rating, navigation);
			if (respons?.status !== 200) {
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return;
			};
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
					rating={ratingNow}
					max={5}
					iconWidth={40}
					iconHeight={40}
					iconSelected={starYelow}
					iconUnselected={starBraun}
					onRate={ratingCompleted} />
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
