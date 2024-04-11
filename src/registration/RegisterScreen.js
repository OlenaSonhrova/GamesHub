import React, { useState, createRef } from 'react';
import { StyleSheet, TextInput, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView,} from 'react-native';

import Loader from '../registration/components/loader';


const RegisterScreen = ({ navigation }) => {
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPassword, setUserPassword] = useState('');

	const [loading, setLoading] = useState(false);

	const emailInputRef = createRef();
	const ageInputRef = createRef();
	const passwordInputRef = createRef();


	const handleSubmitButton = async () => {
		if (!userName) {
			alert('Please fill Name');
			return;
		};
		if (!userEmail) {
			alert('Please fill Email');
			return;
		};
		if (!userPassword) {
			alert('Please fill Password');
			return;
		};
		setLoading(true);
		try {
			setUserName(' ');
			setUserEmail(' ');
			setUserPassword(' ');
			const url = "http://176.36.224.228:24242/api_v1/registerUser";
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: userName,
					email: userEmail,
					password: userPassword,
				}),
			});
			const json = await response.json();
			setLoading(false);
			console.log(json?.status);
			navigation.replace('PrivacyPolicy');
		} catch (error) {
			console.log(error);
			console.log('Problem');
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
							placeholder="Enter Name"
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
					<View style={styles.SectionStyle}>
						<TextInput
							style={styles.inputStyle}
							onChangeText={(UserPassword) =>
								setUserPassword(UserPassword)
							}
							underlineColorAndroid="#f000"
							placeholder="Enter Password"
							placeholderTextColor="#ffffff"
							ref={passwordInputRef}
							returnKeyType="next"
							secureTextEntry={true}
							onSubmitEditing={() =>
								ageInputRef.current &&
								ageInputRef.current.focus()
							}
							blurOnSubmit={false}
						/>
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
});