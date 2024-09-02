import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faArrowLeft, faLocationDot, faUsers, faStopwatch, faFaceSmile } from '@fortawesome/free-solid-svg-icons';




const ModalMyGame = ({ gamePressed, onClose, imageLocal, returnedClickUpDate, offline }) => {

	const [modalVisible, setModalVisible] = useState(true);



	// console.log('gamePdffgbressed', gamePressed);


	if (!gamePressed) {
		return null;
	};

	const closeModal = () => {
		setModalVisible(false);
		onClose();
	};

	const upDateUserGame = (item) => {
		if (offline) {
			Alert.alert("Повідомлення", "Функція доступа тільки в онлайні");
			return;
		};
		returnedClickUpDate(item);
		setModalVisible(false);
		onClose();
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
						<View style={styles.headIcon}>
							<Pressable onPress={closeModal}
								style={({ pressed }) => [
									{
										backgroundColor: pressed ? 'rgba(255, 255, 255, 0.1)' : '',
									},
									styles.arrowLeft,
								]}>
								<FontAwesomeIcon icon={faArrowLeft} size={40} />
							</Pressable>
							<Pressable onPress={() => upDateUserGame(gamePressed)}>
								<FontAwesomeIcon icon={faPenToSquare} size={40} color='#8D6349' />
							</Pressable>
						</View>
						<View style={styles.headFlex}>
							<Image style={styles.image} source={imageLocal} />
							<Text style={styles.headText}>{gamePressed.name}</Text>
						</View>

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
	headIcon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 30,
		gap: 30,
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


export default ModalMyGame;