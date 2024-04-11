
import React, {useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';


import ModalComponent from './modal';
import { SelectedGame } from '../../api/api';

const FlatListComponent = ({ data, image, refreshing, onRefresh}) => {

	const [gamePressed, setGamePressed] = useState(null);
	const [newData, setNewData] = useState(data);
	

	const setSelectedGameHandler = (game) => {
		setGamePressed(game);
	};

	const setSelectedGame = (idGame, selected) => {
		if (selected) {
			const updatedGames = newData.map((game) =>
				game.game_id === idGame ? { ...game, is_selected: false } : game
			);
			setNewData(updatedGames);
		} else {
			const updatedGames = newData.map((game) =>
				game.game_id === idGame ? { ...game, is_selected: true } : game
			);
			setNewData(updatedGames);
		};
		SelectedGame(idGame, selected);
	};


	return (
		<View style={styles.center}>
			<FlatList
				data={newData}
				windowSize={10}
				extraData={refreshing}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh} />
				}
				keyExtractor={(item) => item.game_id}
				renderItem={({ item }) => (
					<View>
						<Pressable style={({ pressed }) => [
							{
								backgroundColor: pressed ? '#FAE2D4' : '#EEC9B0',
							},
							styles.block,
						]} onPress={() => setSelectedGameHandler(item)}>
							<View>
								<Image style={styles.image} source={image} />
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
								<Pressable onPress={() => setSelectedGame(item.game_id, item.is_selected)}>
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
				gamePressed && (<ModalComponent gamePressed={gamePressed} image={image} onClose={() => setGamePressed(null)} />
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
		gap: 20,
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
	modalView: {
		margin: 0,
		padding: 7,
		backgroundColor: '#EEC9B0',
		height: '100%',
	},
	bodyInfaTitle: {
		fontSize: 34,
		color: '#8D6349',
		fontWeight: '500',
		paddingBottom: 5,
	},
	bodyInfaText: {
		fontSize: 18,
		color: 'black',
		fontWeight: '400',
	},
});


export default FlatListComponent;