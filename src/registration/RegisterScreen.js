import React, { useState, createRef } from 'react';
import { StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView, Pressable, } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Loader from '../registration/components/loader';
import { Register } from '../api/api';


const RegisterScreen = ({ navigation }) => {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const [loading, setLoading] = useState(false);

	const emailInputRef = createRef();
	const ageInputRef = createRef();
	const passwordInputRef = createRef();


	const handleSubmitButton = async () => {
		if (!userName) { alert('Будь ласка, введіть Nickname'); return; };
		if (!userEmail) { alert('Будь ласка, заповніть Email'); return; };
		if (!userPassword) { alert('Будь ласка, заповніть Пароль'); return; };
		setLoading(true);
		try {
			const response = await Register(userName, userEmail, userPassword);
			const jsonData = await response.json();
			if (jsonData?.email[0] === 'custom user with this email already exists.' || jsonData?.username[0] === 'custom user with this username already exists.') {
				setLoading(false);
				alert('Щось пішло не так. Користувач з таким Email або Nickname вже існує. Спробуйте ще раз'); return;
			};
			if (response?.status !== 200 && response?.status !== 201) {
				setLoading(false);
				alert('Сервер не відповідає! спробуйте ще раз'); return;
			};
			setLoading(false);
			navigation.replace('PrivacyPolicy');
		} catch (error) {
			console.error(error);
			alert('Opssss. Щось пішло не так', error);
			setLoading(false);
		};
	};

	return (
		<View style={{ flex: 1, backgroundColor: '#DDA394' }}>
			<Loader loading={loading} />
			<ScrollView
				keyboardShouldPersistTaps="handled"
				contentContainerStyle={{
					justifyContent: 'center',
					alignContent: 'center',
				}}>
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
				<KeyboardAvoidingView enabled>
					<View style={styles.SectionStyle}>
						<TextInput
							style={styles.inputStyle}
							onChangeText={(UserName) => setUserName(UserName)}
							underlineColorAndroid="#f000"
							placeholder="Enter Nickname"
							placeholderTextColor="#ffffff"
							autoCapitalize="sentences"
							returnKeyType="next"
							onSubmitEditing={() =>
								emailInputRef.current && emailInputRef.current.focus()
							}
							blurOnSubmit={false}
						/>
					</View>
					<View style={styles.SectionStyle}>
						<TextInput
							style={styles.inputStyle}
							onChangeText={(UserEmail) => setUserEmail(UserEmail)}
							underlineColorAndroid="#f000"
							placeholder="Enter Email"
							placeholderTextColor="#ffffff"
							keyboardType="email-address"
							ref={emailInputRef}
							returnKeyType="next"
							onSubmitEditing={() =>
								passwordInputRef.current &&
								passwordInputRef.current.focus()
							}
							blurOnSubmit={false}
						/>
					</View>
					<View style={styles.Eye}>
						<TextInput
						style={styles.inputStyleEye}
							onChangeText={(UserPassword) =>
								setUserPassword(UserPassword)
							}
							underlineColorAndroid="#f000"
							placeholder="Enter Password"
							placeholderTextColor="#ffffff"
							ref={passwordInputRef}
							returnKeyType="next"
							secureTextEntry={!showPassword}
							onSubmitEditing={() =>
								ageInputRef.current &&
								ageInputRef.current.focus()
							}
							blurOnSubmit={false}
						/>
						<Pressable onPress={() => setShowPassword(!showPassword)}>
							<FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={25} color='#8D6349' />
						</Pressable>
					</View>
					<TouchableOpacity
						style={styles.buttonStyle}
						activeOpacity={0.5}
						onPress={handleSubmitButton}>
						<Text style={styles.buttonTextStyle}>REGISTER</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
		marginBottom: 20,
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
	errorTextStyle: {
		color: 'red',
		textAlign: 'center',
		fontSize: 14,
	},
	successTextStyle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		padding: 30,
	},
	Eye: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 35,
		marginRight: 35,
		marginTop: 20,
		marginBottom: 20,
		height: 40,
		justifyContent: 'space-between',
		color: 'white',
		paddingLeft: 15,
		paddingRight: 15,
		borderWidth: 1,
		borderRadius: 30,
		borderColor: 'black',
	},
	inputStyleEye: {
		color: 'white',
	},
});