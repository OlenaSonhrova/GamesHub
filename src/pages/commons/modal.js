import React, { useState } from 'react';
import { Alert, Linking, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faArrowLeft, faLocationDot, faUsers, faStopwatch, faFaceSmile, faSquareCheck } from '@fortawesome/free-solid-svg-icons';


import RatingGame from './raiting';


const ModalComponent = ({ gamePressed, onClose, setSelectedGame, setPlayedGame, offline }) => {

	const [modalVisible, setModalVisible] = useState(true);


	if (!gamePressed) {
		return null;
	};

	// console.log('gamePdffgbressed', gamePressed);

	const [selectedHard, setSelectedHard] = useState(gamePressed.is_selected);
	const [selecteCheck, setSelectedCheck] = useState(gamePressed.is_played);
	const [hasInteracted, setHasInteracted] = useState(false);
	const [hasInteractedPlayed, setHasInteractedPlayed] = useState(false);
	const [hasInteractedRating, setHasInteractedRating] = useState(false);

	const checkChangeUserRating = (rating) => {
		if (rating !== gamePressed.user_rating) {
			setHasInteractedRating(true);
		} else {
			setHasInteractedRating(false);
		};
	};

	const closeModal = () => {
		setModalVisible(false);
		if (hasInteracted || hasInteractedRating || hasInteractedPlayed) {
			onClose(true);
		} else {
			onClose(false);
		};
	};

	const selectGame = async (name, selected) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		const isSelected = selected !== undefined ? selected : (setSelectedHard(false), true);
		const response = await setSelectedGame(name, isSelected);
		if (response !== 200) {
			return;
		};
		setHasInteracted(!hasInteracted);
		if (selected !== undefined) {
			setSelectedHard(!selectedHard);
		}
	};

	const playedGame = async (name, played) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		const isPlayed = played !== undefined ? played : (setSelectedCheck(false), true);
		const response = await setPlayedGame(name, isPlayed);
		if (response !== 200) {
			return;
		};
		setHasInteractedPlayed(!hasInteractedPlayed);
		if (played !== undefined) {
			setSelectedCheck(!selecteCheck);
		}
	};


	return (
		<View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={closeModal}
			>
				<View style={styles.modalView}>
					<View style={styles.head}>
						<Pressable onPress={closeModal}
							style={({ pressed }) => [
								{
									backgroundColor: pressed ? 'rgba(255, 255, 255, 0.1)' : '',
								},
								styles.arrowLeft,
							]}>
							<FontAwesomeIcon icon={faArrowLeft} size={40} />
						</Pressable>
						<View style={styles.headFlex}>
							<Text style={styles.headText}>{gamePressed.name}</Text>
							<View>
								<Pressable style={styles.faHeart} onPress={() => selectGame(gamePressed.name, selectedHard)}>
									<FontAwesomeIcon icon={faHeart} size={30} color={selectedHard || selectedHard === undefined ? 'red' : 'black'} />
								</Pressable>
							</View>

							<View>
								<Pressable style={styles.faSquareCheck} onPress={() => playedGame(gamePressed.name, selecteCheck)}>
									<FontAwesomeIcon icon={faSquareCheck} size={30} color={selecteCheck || selecteCheck === undefined ? '#1b851b' : 'black'} />
								</Pressable>
							</View>

						</View>
						<RatingGame idGame={gamePressed.name} userRating={gamePressed.user_rating} checkChangeUserRating={checkChangeUserRating} offline={offline} />
					</View>
					<View style={styles.body}>
						<View style={styles.bodyIcon}>
							<View style={styles.bodyIconItem}>
								<FontAwesomeIcon icon={faStopwatch} size={30} color='black' />
								<Text style={styles.bodyIconTextt}>{gamePressed.duration_sec} хв.</Text>
							</View>
							<View style={styles.bodyIconItem}>
								<FontAwesomeIcon icon={faUsers} size={30} color='black' />
								<Text style={styles.bodyIconTextt}>{gamePressed.count_players} уч.</Text>
							</View>
							<View style={styles.bodyIconItem}>
								<FontAwesomeIcon icon={faFaceSmile} size={30} color='black' />
								<Text style={styles.bodyIconTextt}>{gamePressed.player_age} років</Text>
							</View>
							<View style={styles.bodyIconItem}>
								<FontAwesomeIcon icon={faLocationDot} size={30} color='black' />
								{gamePressed.locations.map((location, index) => (
									<Text key={index} style={styles.bodyIconTextt}>{location}</Text>
								))}
							</View>
						</View>
						<ScrollView style={styles.bodyInfa}>
							<View style={styles.bodyInfaItem}>
								<Text style={styles.bodyInfaTitle}>Основне завдання</Text>
								<Text style={styles.bodyInfaText}>{gamePressed.description}</Text>
							</View>
							<View style={styles.bodyInfaItem}>
								<Text style={styles.bodyInfaTitle}>Реквізит</Text>
								<Text style={styles.bodyInfaText}>{gamePressed.props}</Text>
							</View>
							{gamePressed.link_to_site && (
								<View style={styles.bodyInfaItem}>
									<Text style={styles.bodyInfaTitle}>Посилання на гру</Text>
									<TouchableOpacity onPress={() => Linking.openURL(gamePressed.link_to_site)}>
										<Text style={styles.bodyInfaText}>{gamePressed.link_to_site}</Text>
									</TouchableOpacity>
								</View>
							)}
						</ScrollView>
						<Text style={styles.paddingBottom}>Автор: {gamePressed.author}</Text>
					</View>
				</View>
			</Modal>
		</View>
	)
};


const styles = StyleSheet.create({
	modalView: {
		margin: 0,
		padding: 7,
		backgroundColor: '#EEC9B0',
		height: '100%',
	},
	head: {
	},
	body: {
		flex: 1,
		marginTop: 10,
		padding: 5,
		backgroundColor: '#FFFAF5',
		borderTopEndRadius: 20,
		borderTopLeftRadius: 20,
	},
	arrowLeft: {
		padding: 10,
		paddingBottom: 0,
	},
	headFlex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 40,
		gap: 10,
	},
	faHeart: {
		padding: 30,
		paddingLeft: 45,
		paddingRight: 10,
	},
	headText: {
		fontSize: 34,
		color: 'black',
		fontWeight: '700',
		maxWidth: '75%'
	},
	bodyIcon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-around',
		paddingBottom: 10,
		paddingTop: 10,
		width: '100%',
		minHeight: 125,
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
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


export default ModalComponent;