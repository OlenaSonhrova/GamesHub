import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import TextPrivacyPolice from './components/textPrivacyPolice';



const PrivacyPolicy = ({ navigation }) => {

	const [accepted, setAccepted] = useState(false);
	const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);



	const handleScroll = (event) => {
		const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
		const { height } = layoutMeasurement;
		const { y } = contentOffset;
		const { height: contentHeight } = contentSize;
		if (y + height >= contentHeight) {
			setAccepted(true);
		}
	};

	const handleScrollEnd = () => {
		setAccepted(true);
	};

	if (isRegistraionSuccess) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#DDA394',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Image
					source={require('../image/success_icon.png')}
					style={{
						height: 150,
						resizeMode: 'contain',
						alignSelf: 'center'
					}}
				/>
				<Text style={styles.successTextStyle}>
					Registration Successful
				</Text>
				<TouchableOpacity
					style={styles.buttonStyle}
					activeOpacity={0.5}
					onPress={() => navigation.navigate('LoginScreen')}>
					<Text style={styles.buttonTextStyle}>Login Now</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={{ backgroundColor: '#FFFAF0' }}>
			<View style={styles.container}>
				<Text style={styles.title}>Угода користувача та політика конфіденційності</Text>
				<ScrollView style={styles.tcContainer} onScroll={handleScroll} onMomentumScrollEnd={handleScrollEnd}>
					<TextPrivacyPolice />
				</ScrollView>
				<TouchableOpacity disabled={!accepted} onPress={() => setIsRegistraionSuccess(true)} style={accepted ? styles.button : styles.buttonDisabled}><Text style={styles.buttonLabel}>Прийняти</Text></TouchableOpacity>
			</View>
		</View>

	);
};

const { width, height } = Dimensions.get('window');

const styles = {
	container: {
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
	},
	title: {
		fontSize: 22,
		alignSelf: 'center'
	},
	
	tcContainer: {
		backgroundColor: '#ffffff',
		marginTop: 15,
		marginBottom: 15,
		height: height * .8,
	},

	button: {
		backgroundColor: '#DDA394',
		borderRadius: 5,
		padding: 10,
	},

	buttonLabel: {
		fontSize: 14,
		color: '#FFF',
		alignSelf: 'center',
	},
	successTextStyle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		padding: 30,
	},
	buttonStyle: {
		backgroundColor: 'black',
		color: '#FFFFFF',
		alignItems: 'center',
		borderRadius: 30,

	},
	buttonTextStyle: {
		color: '#FFFFFF',
		padding: 20,
		fontSize: 16,
	},
}

export default PrivacyPolicy;