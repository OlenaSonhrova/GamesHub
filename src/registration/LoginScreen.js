import React, { useState, createRef, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, Image, Keyboard, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../registration/components/loader';
import { LoginUser } from '../api/api';


const LoginScreen = ({ navigation }) => {

	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const passwordInputRef = createRef();

	useEffect(() => {
		const getUserCredentials = async () => {
			try {
				const userEmails = await AsyncStorage.getItem('userEmail');
				if (userEmails) {
					setUserEmail(userEmails);
				};
			} catch (error) {
				console.error('Error getting user credentials:', error);
				return;
			}
		};
		getUserCredentials();
	}, []);

	const handleSubmitPress = async () => {
		if (!userEmail) { alert('Будь ласка, заповніть Nickname'); return; };
		if (!userPassword) { alert('Будь ласка, заповніть Password'); return; };
		setLoading(true);
		try {
			const response = await LoginUser(userEmail, userPassword);
			const jsonData = await response.json();
			if (jsonData?.non_field_errors) {
				alert('Не правильний Password або Nickname');
				setLoading(false);
				return;
			} else if (response?.status !== 200) {
				alert('Сервер не відповідає! спробуйте ще раз');
				setLoading(false);
				return;
			} else {
				await AsyncStorage.setItem('access', jsonData?.access);
				await AsyncStorage.setItem('refresh', jsonData?.refresh);
				await AsyncStorage.setItem('userEmail', userEmail);
				setLoading(false);
				navigation.replace('DrawerNavigator');
			};
		} catch (error) {
			console.error('Error logging in:', error);
		} finally {
			setLoading(false); // <--- Move this here
		};
	};

	return (
		<View style={styles.mainBody}>
			<Loader loading={loading} />
			<ScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					flex: 1,
					justifyContent: 'center',
					alignContent: 'center',
				}}>
				<View>
					<KeyboardAvoidingView enabled>
						<View style={{ alignItems: 'center' }}>
							<Image
								source={require('../image/fonCirkcl.png')}
								style={{
									width: '50%',
									height: 100,
									resizeMode: 'contain',
									margin: 30,
								}}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								onChangeText={(UserEmail) =>
									setUserEmail(UserEmail)
								}
								value={userEmail}
								placeholder="Enter Nickname"
								placeholderTextColor="#ffffff"
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={() =>
									passwordInputRef.current &&
									passwordInputRef.current.focus()
								}
								underlineColorAndroid="#f000"
								blurOnSubmit={false}
							/>
						</View>
						<View style={styles.SectionStyle}>
							<TextInput
								style={styles.inputStyle}
								onChangeText={(UserPassword) =>
									setUserPassword(UserPassword)
								}
								// value={userPassword}
								placeholder="Enter Password" //12345
								placeholderTextColor="#ffffff"
								keyboardType="default"
								ref={passwordInputRef}
								onSubmitEditing={Keyboard.dismiss}
								blurOnSubmit={false}
								secureTextEntry={true}
								underlineColorAndroid="#f000"
								returnKeyType="next"
							/>
						</View>
						<TouchableOpacity
							style={styles.buttonStyle}
							activeOpacity={0.5}
							onPress={handleSubmitPress}>
							<Text style={styles.buttonTextStyle}>LOGIN</Text>
						</TouchableOpacity>
						<Text
							style={styles.registerTextStyle}
							onPress={() => navigation.navigate('RegisterScreen')}>
							New Here? Register
						</Text>
					</KeyboardAvoidingView>
				</View>
			</ScrollView>
		</View>
	);
};
export default LoginScreen;

const styles = StyleSheet.create({
	mainBody: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#DDA394',
		alignContent: 'center',
	},
	SectionStyle: {
		flexDirection: 'row',
		height: 40,
		marginTop: 20,
		marginLeft: 35,
		marginRight: 35,
		margin: 10,
	},
	buttonStyle: {
		backgroundColor: 'black',
		borderWidth: 0,
		color: '#FFFFFF',
		borderColor: '#7DE24E',
		height: 40,
		alignItems: 'center',
		borderRadius: 30,
		marginLeft: 35,
		marginRight: 35,
		marginTop: 20,
		marginBottom: 25,
	},
	buttonTextStyle: {
		color: '#FFFFFF',
		paddingVertical: 10,
		fontSize: 16,
	},
	inputStyle: {
		flex: 1,
		color: 'white',
		paddingLeft: 15,
		paddingRight: 15,
		borderWidth: 1,
		borderRadius: 30,
		borderColor: 'black',
	},
	registerTextStyle: {
		color: '#FFFFFF',
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 14,
		alignSelf: 'center',
		padding: 10,
	},

});