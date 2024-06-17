import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';


import { logout } from '../api/api';


const LogoutButton = ({ }) => {

	const navigation = useNavigation();

	const handleLogout = async () => {
		try {
			const response = await logout();
			if (response === 205) {
				await AsyncStorage.removeItem('access');
				await AsyncStorage.removeItem('refresh');
				navigation.replace('Auth');
			} else {
				Alert.alert('Помилка', 'Сталася помилка при виході з системи.');
			}
		} catch (error) {
			// console.error('Помилка під час виходу з системи:', error);
			Alert.alert('Помилка', 'Сталася помилка при виході з системи.');
		}
	};

	const showAlert = () => {
		Alert.alert(
			'Logout',
			'Are you sure? You want to logout?',
			[
				{
					text: 'Cancel',
					onPress: () => null,
				},
				{
					text: 'Confirm',
					onPress: handleLogout,
				},
			],
			{ cancelable: false },
		);
	};

	return (
		<TouchableOpacity style={styles.container} onPress={showAlert} >
			<View style={{ marginRight: 10 }}>
				<FontAwesomeIcon icon={faArrowRightFromBracket} size={25} color='#8D6349' />
			</View>
			<Text style={{ color: 'black', fontSize: 14, }}>Logout</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		marginLeft: 20,
		margin: 15,
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
});

export default LogoutButton;