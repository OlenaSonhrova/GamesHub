import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faPenToSquare, faArrowLeft, faLocationDot, faUsers, faStopwatch, faFaceSmile } from '@fortawesome/free-solid-svg-icons';




const ModalMyGame = ({ gamePressed, onClose, imageLocal, returnedClickUpDate, offline }) => {

	const [modalVisible, setModalVisible] = useState(true);


	if (!gamePressed) {
		return null;
	};

	const closeModal = () => {
		setModalVisible(false);
		onClose();
	};

	const upDateUserGame = (item) => {
		if(offline) {
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
								<Text style={styles.bodyIconTextt}>{gamePressed.location}</Text>
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
	arrowLeft: {
		padding: 10,
	},
	headFlex: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 30,
		gap: 30,

	},
	headText: {
		fontSize: 38,
		color: 'black',
		fontWeight: '700',
	},
	body: {
		marginTop: 10,
		padding: 5,
		backgroundColor: '#FFFAF5',
		borderTopEndRadius: 20,
		borderTopLeftRadius: 20,
		height: '80%',
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
	headIcon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});


export default ModalMyGame;