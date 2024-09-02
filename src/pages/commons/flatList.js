import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faHeart, faSquareCheck } from '@fortawesome/free-solid-svg-icons';


import ModalComponent from './modal';
import { PlayedGame, RemoveSelectedGame, RemoveUserPlayedGame, SelectedGame } from '../../api/api';

const FlatListComponent = ({ data, image, refreshing, onRefresh, navigation, imageLocal, offline, listGamesPlayed, listGamesLiked}) => {


	const [gamePressed, setGamePressed] = useState(null);
	const [newData, setNewData] = useState(data);

	useEffect(() => {
		setNewData(data);
	}, [data]);

	const setSelectedGameHandler = (game) => {
		setGamePressed(game);
	};

	const setSelectedGame = async (idGame, selected) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		if (selected) {
			const response = await RemoveSelectedGame(idGame, navigation);
			if (response?.status !== 200) {
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return response?.status;
			} else {
				const updatedGames = newData.map((game) =>
					game.name === idGame ? { ...game, is_selected: false } : game
				);
				setNewData(updatedGames);
				return response?.status;
			};
		} else {
			const response = await SelectedGame(idGame, navigation);
			if (response?.status !== 200) {
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return response?.status;
			} else {
				const updatedGames = newData.map((game) =>
					game.name === idGame ? { ...game, is_selected: true } : game
				);
				setNewData(updatedGames);
				return response?.status;
			};
		};
	};

	const setPlayedGame = async (idGame, played) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		if (played) {
			const response = await RemoveUserPlayedGame(idGame, navigation);
			if (response?.status !== 200) {
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return response?.status;
			} else {
				const updatedGames = newData.map((game) =>
					game.name === idGame ? { ...game, is_played: false } : game
				);
				setNewData(updatedGames);
				return response?.status;
			};
		} else {
			const response = await PlayedGame(idGame, navigation);
			if (response?.status !== 200) {
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return response?.status;
			} else {
				const updatedGames = newData.map((game) =>
					game.name === idGame ? { ...game, is_played: true } : game
				);
				setNewData(updatedGames);
				return response?.status;
			};
		};
	};

	const setRemoveGame = async (idGame) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		const response = await RemoveSelectedGame(idGame, navigation);
		if (response?.status !== 200) {
			Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
			return;
		} else {
			const updatedGames = newData.filter((game) => game.name !== idGame);
			setNewData(updatedGames);
		};
	};

	const setRemoveCheckGame = async (idGame) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		const response = await RemoveUserPlayedGame(idGame, navigation);
		if (response?.status !== 200) {
			Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
			return;
		} else {
			const updatedGames = newData.filter((game) => game.name !== idGame);
			setNewData(updatedGames);
		};
	};

	if (refreshing) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color="gray" />
			</View>
		);
	}

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
								backgroundColor: pressed ? '#FAE2D4' : '#EEC9B0',
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
							<View style={styles.blockHeartCheck}>
								<Pressable style={styles.blockHeart} onPress={() => {
									if (listGamesLiked) {
										setRemoveGame(item.name, item.is_selected);
									} else {
										setSelectedGame(item.name, item.is_selected)
									}
								}}>
									<FontAwesomeIcon icon={faHeart} size={30} color={item.is_selected === undefined ? 'red' : item.is_selected ? 'red' : '#8f7878'} />
								</Pressable>
								<Pressable style={styles.blockCheck} onPress={() => {
									if (listGamesPlayed) {
										setRemoveCheckGame(item.name, item.is_played);
									} else {
										setPlayedGame(item.name, item.is_played)
									}
								}}>
									<FontAwesomeIcon icon={faSquareCheck} size={30} color={item.is_played === undefined ? 'black' : item.is_played ? 'black' : '#8f7878'} />
								</Pressable>
							</View>
						</Pressable>
					</View>
				)}
				ListFooterComponent={() => (
					<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 30, fontWeight: 'bold' }}> </Text>
				)}
			/>
			{
				gamePressed && (<ModalComponent gamePressed={gamePressed} onClose={(hasInteracted) => { setGamePressed(null); if (hasInteracted) { onRefresh(); } }} setSelectedGame={setSelectedGame} offline={offline} />
				)}
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		height: '100%',
	},
	block: {
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		padding: 5,
		borderRadius: 7,
	},
	blockText: {
		flexBasis: '50%',
	},
	text: {
		color: 'black',
		fontSize: 20,
	},
	number: {
		color: 'black',
	},
	blockIcon: {
		backgroundColor: 'green',
	},
	average_rating: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	rating: {
		fontSize: 14,
		color: 'black',
	},
	image: {
		height: 35,
		width: 35,
		margin: 4,
		marginRight: 10,
	},
	blockHeartCheck: {
		display: 'flex',
		flexDirection: 'row',


	},
	blockHeart: {
		paddingHorizontal: 15,
		paddingVertical: 22,
		// borderColor: 'black',
		// borderWidth: 1,
	},
	blockCheck: {
		paddingHorizontal: 15,
		paddingVertical: 22,
		// borderColor: 'black',
		// borderWidth: 1,
	},
});


export default FlatListComponent;