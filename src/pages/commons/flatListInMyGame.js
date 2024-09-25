import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import { DeleteUserGame } from '../../api/api';
import ModalMyGame from './modalMyGame';


const FlatListInMyGame = ({ data, image, refreshing, onRefresh, navigation, imageLocal, returnedClickUpDate, offline }) => {

	const [gamePressed, setGamePressed] = useState(null);
	const [newData, setNewData] = useState(data);


	useEffect(() => {
		setNewData(data);
	}, [data]);

	const setSelectedGameHandler = (game) => {
		setGamePressed(game);
	};

	const deleteUserGame = async (idGame) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		Alert.alert('Ви впевнені, що хочете видалити гру?', 'Гра видаляється назавжди', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK', onPress: async () => {
					const response = await DeleteUserGame('/core/deleteUserGame/', idGame, navigation);
					if (response?.status !== 200) {
						Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
						return;
					};
					const updatedGames = newData.filter((game) => game.name !== idGame);
					setNewData(updatedGames);
				}
			},
		]);
	};

	const upDateUserGame = (item) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		returnedClickUpDate(item);
	};

	return (
		<View style={styles.center}>
			<FlatList
				data={newData}
				style={{ flex: 1 }}
				windowSize={10}
				extraData={refreshing}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh} />
				}
				keyExtractor={(item) => item.name}
				renderItem={({ item, index }) => (
					<View>
						<Pressable style={({ pressed }) => [
							{
								backgroundColor: item.is_private ? (pressed ? '#FAE2D4' : 'gray') : (pressed ? '#FAE2D4' : '#EEC9B0'),
							},
							styles.block,
						]} onPress={() => setSelectedGameHandler(item)}>
							<View>
								<Image style={styles.image} key={index} source={image ? { uri: image } : imageLocal} />
							</View>
							<View style={styles.blockText}>
								<Text style={styles.number}>{item.creation_date}</Text>
								<Text style={styles.text}>{item.name}</Text>
								<View style={styles.average_rating}>
									<FontAwesomeIcon icon={faStar} size={15} color='#8D6349' />
									<Text style={styles.rating}>{item.average_rating}</Text>
								</View>
							</View>
							<View style={styles.blockDeletUpDate}>
								<View>
									<Pressable style={styles.blockDelet} onPress={() => deleteUserGame(item.name)}>
										<FontAwesomeIcon icon={faTrash} size={30} color='#8D6349' />
									</Pressable>
								</View>
								<View>
									<Pressable style={styles.blockUpDate} onPress={() => upDateUserGame(item)}>
										<FontAwesomeIcon icon={faPenToSquare} size={30} color='#8D6349' />
									</Pressable>
								</View>
							</View>
						</Pressable>
					</View>
				)}
				ListFooterComponent={() => (
					<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 50, fontWeight: 'bold' }}> </Text>
				)}
			/>
			{
				gamePressed && (<ModalMyGame gamePressed={gamePressed} onClose={() => setGamePressed(null)} imageLocal={imageLocal} returnedClickUpDate={returnedClickUpDate} offline={offline}/>
				)}
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		height: '100%',
	},
	block: {
		marginBottom: 8,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		borderRadius: 7,
	},
	blockText: {
		flexBasis: '55%',
	},
	text: {
		color: 'black',
		fontSize: 24,
	},
	number: {
		color: 'black',
	},
	average_rating: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	rating: {
		fontSize: 16,
		color: 'black',
	},
	image: {
		height: 35,
		width: 35,
		margin: 4,
		marginRight: 10,
	},
	blockDeletUpDate: {
		display: 'flex',
		flexDirection: 'row',
	},
	blockUpDate: {
		padding: 13,
	},
	blockDelet: {
		padding: 13,
	},
});


export default FlatListInMyGame;