import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';


import ModalComponent from './modal';
import { RemoveSelectedGame, SelectedGame } from '../../api/api';

const FlatListComponent = ({ data, image, refreshing, onRefresh, navigation, imageLocal }) => {

	const [gamePressed, setGamePressed] = useState(null);
	const [newData, setNewData] = useState(data);

	useEffect(() => {
		setNewData(data);
	}, [data]);

	const setSelectedGameHandler = (game) => {
		setGamePressed(game);
	};

	const setSelectedGame = async (idGame, selected) => {
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

	const setRemoveGame = async (idGame) => {
		const response = await RemoveSelectedGame(idGame, navigation);
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
							<View>
								<Pressable style={styles.blockHeart} onPress={() => {
									if (item.is_selected === undefined) {
										setRemoveGame(item.name, item.is_selected);
									} else {
										setSelectedGame(item.name, item.is_selected)
									}
								}}>
									<FontAwesomeIcon icon={faHeart} size={30} color={item.is_selected === undefined ? 'red' : item.is_selected ? 'red' : 'black'} />
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
				gamePressed && (<ModalComponent gamePressed={gamePressed} onClose={() => { setGamePressed(null); onRefresh(); }} setSelectedGame={setSelectedGame} />
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
		flexBasis: '63%',
	},
	text: {
		color: 'black',
		fontSize: 20,
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
	blockHeart: {
		paddingHorizontal: 26,
		paddingVertical: 22,
	},
});


export default FlatListComponent;