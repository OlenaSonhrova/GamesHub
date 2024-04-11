import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, FlatList, Image, Modal, Alert, RefreshControl } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faPenToSquare, faArrowLeft, faLocationDot, faUsers, faStopwatch, faFaceSmile, faCirclePlus, faThumbsUp, faCircleMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddGame from './addGames';
import Loader from '../../registration/components/loader';
import RatingGame from '../commons/raiting';


const MyGamess = () => {

	// const refresh = useRefresh();

	const [addGameVisible, setAddGameVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState([]);
	const [details, setDetails] = useState(" ");
	const [upDate, setUpDate] = useState(false);
	const [gameIdForUpDAteInfa, setGameIdForUpDAteInfa] = useState();
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);


	const getUserCreatedGames = useCallback(async () => {
		setLoading(true);
		try {
			const id = await AsyncStorage.getItem('user_id');
			const url = ('http://176.36.224.228:24242/api_v1/getUserCreatedGames?' + new URLSearchParams({ user_id: id }));
			const response = await fetch(url);
			const json = await response.json();
			console.log(json);
			setData(json?.games);
			setLoading(false);
		} catch (error) {
			console.error(error);
			console.log(error.message);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getUserCreatedGames();
	}, []);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		getUserCreatedGames();
		setRefreshing(false);
	}, []);


	const deleteUserGame = (idGame) => {
		Alert.alert('Ви впевнені, що хочете видалити гру?', 'Гра видаляється назавжди', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK', onPress: async () => {
					console.log('OK Pressed');
					setData(data.filter((item) => item.game_id !== idGame));
					try {
						const url = "http://176.36.224.228:24242/api_v1/deleteUserGame";
						const idUser = await AsyncStorage.getItem('user_id');
						const response = await fetch(url, {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								user_id: idUser,
								game_id: idGame,
							}),
						});
						const json = await response.json();
						console.log(json?.status)
					} catch (error) {
						console.log('Incorrect remove game in select game');
						console.log(error);
					};
				}
			},
		]);
	};

	const handleData = (dataFromChild) => {
		setAddGameVisible(!addGameVisible);
		setUpDate(false);
		if (dataFromChild === "відповідь, щоб закрилось вікно додавання гри") {
			console.log('відповідь, щоб закрилось вікно додавання гри');
		} else {
			const getIdGame = dataFromChild.game_id;
			if (gameIdForUpDAteInfa !== getIdGame) {
				setData([...data, dataFromChild]);
				// console.log(dataFromChild);
				console.log('додавання гри');
				// return;
			} else {
				console.log('оновлення гри');
			};
		};
	};

	const upDateUserGame = (idGame) => {
		setAddGameVisible(!addGameVisible);
		setUpDate(true);
		setGameIdForUpDAteInfa(idGame);
	};


	return (
		<View style={styles.backgroundColor}>
			<Loader loading={loading} />
			<SafeAreaView>
				<Pressable style={styles.addGameBlock} onPress={() => { setAddGameVisible(!addGameVisible); setUpDate(false) }}>
					<Text style={styles.addGameText}>Додати гру</Text>
					<FontAwesomeIcon icon={addGameVisible ? faCircleMinus : faCirclePlus} size={30} color='#8D6349' />
				</Pressable>
				{addGameVisible ? <AddGame onDataSubmit={handleData} details={data} upDate={upDate} gameIdForUpDAteInfa={gameIdForUpDAteInfa} /> : null}
				<View style={styles.center}>
					<FlatList
						data={data} extraData={data} windowSize={10} keyExtractor={item => item.game_id}
						refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
						renderItem={({ item }) => (
							<View>
								<Pressable style={styles.block} onPress={() => {
									setModalVisible(true);
									setDetails(item);
								}}>
									<View>
										<Image style={styles.image} source={require('../../image/myGame.png')} />
									</View>
									<View style={styles.blockText}>
										<Text style={styles.number}>{item.creation_date}</Text>
										<Text style={styles.text}>{item.name}</Text>
										<View style={styles.rating}>
											<FontAwesomeIcon icon={faThumbsUp} size={15} color='#8D6349' />
											<Text >{item.rating}</Text>
										</View>
									</View>
									<View style={styles.blockDeletUpDate}>
										<View>
											<Pressable onPress={() => upDateUserGame(item.game_id)}>
												<FontAwesomeIcon icon={faPenToSquare} size={25} color='#8D6349' />
											</Pressable>
										</View>
										<View>
											<Pressable onPress={() => deleteUserGame(item.game_id)}>
												<FontAwesomeIcon icon={faTrash} size={25} color='#8D6349' />
											</Pressable>
										</View>
									</View>
								</Pressable>
								<Modal
									animationType="fade"
									transparent={true}
									visible={modalVisible}
								>
									<View style={styles.modalView}>
										<View style={styles.head}>
											<Pressable onPress={() => {
												setModalVisible(!modalVisible);
												setDetails(" ")
											}} style={styles.arrowLeft}>
												<FontAwesomeIcon icon={faArrowLeft} size={40} color='black' />
											</Pressable>
											<View style={styles.headFlex}>
												<Text style={styles.headText}>{details.name}</Text>
												<Image source={require('../../image/myGame.png')} />
												<View>
													<Pressable onPress={() => setSelectedGame(details.game_id, details.is_selected)}>
														<FontAwesomeIcon icon={faHeart} size={30} color={details.is_selected ? 'red' : ''} />
													</Pressable>
												</View>
											</View>
											<RatingGame idGame={details.game_id} userRating={details.user_rating} />
										</View>
										<View style={styles.body}>
											<View style={styles.bodyIcon}>
												<View style={styles.bodyIconItem}>
													<FontAwesomeIcon icon={faStopwatch} size={30} color='black' />
													<Text style={styles.bodyIconTextt}>{details.duration_sec} хв.</Text>
												</View>
												<View style={styles.bodyIconItem}>
													<FontAwesomeIcon icon={faUsers} size={30} color='black' />
													<Text style={styles.bodyIconTextt}>{details.count_players} уч.</Text>
												</View>
												<View style={styles.bodyIconItem}>
													<FontAwesomeIcon icon={faFaceSmile} size={30} color='black' />
													<Text style={styles.bodyIconTextt}>{details.age} років</Text>
												</View>
												<View style={styles.bodyIconItem}>
													<FontAwesomeIcon icon={faLocationDot} size={30} color='black' />
													<Text style={styles.bodyIconTextt}>{details.location}</Text>
												</View>
											</View>
											<ScrollView style={styles.bodyInfa}>
												<View style={styles.bodyInfaItem}>
													<Text style={styles.bodyInfaTitle}>Основне завдання</Text>
													<Text style={styles.bodyInfaText}>{details.description}</Text>
												</View>
												<View style={styles.bodyInfaItem}>
													<Text style={styles.bodyInfaTitle}>Реквізит</Text>
													<Text style={styles.bodyInfaText}>{details.props}</Text>
												</View>
											</ScrollView>
											<Text style={styles.paddingBottom}>Автор: {details.author}</Text>
										</View>
									</View>
								</Modal>
							</View>
						)
						}
						ListFooterComponent={() => (
							<Text style={{ fontSize: 30, marginBottom: 100, textAlign: "center", fontWeight: 'bold' }}>Thank You</Text>
						)}
					/>
				</View>
			</SafeAreaView>
		</View>

	);
};

const styles = StyleSheet.create({
	center: {
		height: '100%',
	},
	backgroundColor: {
		backgroundColor: '#FFFAF5',
		height: '100%',
	},
	addGameBlock: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		paddingBottom: 10,
	},
	blockText: {
		flexBasis: '63%',
	},
	block: {
		margin: 10,
		marginBottom: 0,
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
		backgroundColor: '#EEC9B0',
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
	},
	rating: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	modalView: {
		margin: 0,
		padding: 7,
		backgroundColor: '#EEC9B0',
		height: '100%',
	},
	head: {
	},
	arrowLeft: {
		padding: 10,
	},
	headFlex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headText: {
		fontSize: 34,
		color: 'black',
		fontWeight: '700',
		paddingBottom: 30,
	},
	body: {
		marginTop: 10,
		padding: 5,
		backgroundColor: '#FFFAF5',
		borderTopEndRadius: 20,
		borderTopLeftRadius: 20,
	},
	bodyIcon: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingBottom: 30,
	},
	bodyIconItem: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bodyIconTextt: {
		maxWidth: 100,
		fontSize: 16,
		color: 'black',
	},
	bodyInfa: {
		display: 'flex',
		gap: 30,
		height: '62%',
	},
	bodyInfaItem: {
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
	paddingBottom: {
	},
	fontAwesomeIcon: {
		color: 'red'
	},
	blockDeletUpDate: {
		display: 'flex',
		gap: 10,
	},
});

export default MyGamess;
