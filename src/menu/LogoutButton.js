import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


import { logout } from '../api/api';


const LogoutButton = ({ navigation }) => {

	const handleLogout = async () => {
		const response = await logout();
		if (response === 205) {
			await AsyncStorage.removeItem('access');
			await AsyncStorage.removeItem('refresh');
			navigation.replace('Auth');
		};
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