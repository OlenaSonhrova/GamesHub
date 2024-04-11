import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faArrowLeft, faLocationDot, faUsers, faStopwatch, faFaceSmile, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RatingGame from '../commons/raiting';
import Loader from '../../registration/components/loader';




const Likedd = () => {

	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState();
	const [details, setDetails] = useState(" ");
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);


	const getUserSelectedGames = useCallback(async () => {
		setLoading(true);
		try {
			const id = await AsyncStorage.getItem('user_id');
			const url = ('http://176.36.224.228:24242/api_v1/getUserSelectedGames?' + new URLSearchParams({ user_id: id }));
			const response = await fetch(url);
			const json = await response.json();
			// console.log(json);
			setData(json?.games);
			setLoading(false);
		} catch (error) {
			console.error(error);
			console.log(error.message);
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		getUserSelectedGames();
	}, [getUserSelectedGames]);


	const onRefresh = useCallback(() => {
		setRefreshing(true);
		getUserSelectedGames();
		setRefreshing(false);
	}, [getUserSelectedGames]);


	const setSelectedGame = async (idGame) => {
		setData(data.filter((item) => item.game_id !== idGame));
		const url = "http://176.36.224.228:24242/api_v1/removeSelectedGame";
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
		if (json?.status === 'SUCCESS') {
			console.log(json?.status)
		} else {
			console.log('Incorrect remove game in select game');;
		}
	};

	return (
		<View style={styles.center}>
			<Loader loading={loading} />
			<FlatList
				data={data}
				windowSize={7}
				extraData={data}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh} />
				}
				renderItem={({ item, index }) => (
					<View>
						<Pressable style={styles.block} onPress={() => {
							setModalVisible(true);
							setDetails(item);
						}}>
							<View>
								<Image style={styles.image} key={index} source={require('../../image/selected.png')} />
							</View>
							<View style={styles.blockText}>
								<Text style={styles.number}>{item.creation_date}</Text>
								<Text style={styles.text}>{item.name}</Text>
								<View style={styles.rating}>
									<FontAwesomeIcon icon={faThumbsUp} size={15} color='#8D6349' />
									<Text >{item.rating}</Text>
								</View>
							</View>
							<View>
								<Pressable onPress={() => setSelectedGame(item.game_id)}>
									<FontAwesomeIcon icon={faHeart} size={30} color='red' />
								</Pressable>
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
					<Text style={{ fontSize: 30, textAlign: "center", marginBottom: 30, fontWeight: 'bold' }}>Thank You</Text>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		height: '100%',
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
		fontSize: 16,
		color: 'black',
	},
	bodyInfa: {
		display: 'flex',
		gap: 30,
		height: '62%',
	},
	paddingBottom: {
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
});


export default Likedd;
