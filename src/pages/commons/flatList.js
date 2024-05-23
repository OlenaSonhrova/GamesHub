import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';


import ModalComponent from './modal';
import { RemoveSelectedGame, SelectedGame } from '../../api/api';

const FlatListComponent = ({ data, image, refreshing, onRefresh, navigation }) => {

	const [gamePressed, setGamePressed] = useState(null);
	const [newData, setNewData] = useState(data);

	useEffect(() => {
		setNewData(data);
	}, [data]);

	const setSelectedGameHandler = (game) => {
		setGamePressed(game);
	};

	const setSelectedGame = (idGame, selected) => {
		if (selected) {
			const updatedGames = newData.map((game) =>
				game.name === idGame ? { ...game, is_selected: false } : game
			);
			setNewData(updatedGames);
			RemoveSelectedGame(idGame, navigation);
		} else {
			const updatedGames = newData.map((game) =>
				game.name === idGame ? { ...game, is_selected: true } : game
			);
			setNewData(updatedGames);
			SelectedGame(idGame, navigation);
		};
	};

	const updateRating = (idGame, newRating) => {
		const updatedData = newData.map((game) => {
			if (game.name === idGame) {
				return { ...game, user_rating: newRating };
			}
			return game;
		});
		setNewData(updatedData);
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
								backgroundColor: pressed ? '#FAE2D4' : '#EEC9B0',
							},
							styles.block,
						]} onPress={() => setSelectedGameHandler(item)}>
							<View>
								<Image style={styles.image} key={index} source={image ? { uri: image } : require('../../image/search.png')} />
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
								<Pressable onPress={() => setSelectedGame(item.name, item.is_selected)}>
									<FontAwesomeIcon icon={faHeart} size={30} color={item.is_selected ? 'red' : ''} />
								</Pressable>
							</View>
						</Pressable>
					</View>
				)}
				ListFooterComponent={() => (
					<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 30, fontWeight: 'bold' }}>Thank You</Text>
				)}
			/>
			{
				gamePressed && (<ModalComponent gamePressed={gamePressed} onClose={() => setGamePressed(null)} setSelectedGame={setSelectedGame} updateRating={updateRating}/>
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
		fontSize: 24,
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
		fontSize: 16,
		color: 'black',
	},
	image: {
		height: 70,
		width: 70,
		margin: 4,
		marginRight: 10,
	},
});


export default FlatListComponent;