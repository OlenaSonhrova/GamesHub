import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Image, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
	const [animating, setAnimating] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAnimating(false);
			AsyncStorage.getItem('user_id').then((value) =>
				navigation.replace(
					value === null ? 'Auth' : 'DrawerNavigator'
				),
			);
		}, 1000);
	}, []);

	return (
		<ImageBackground source={require('../image/fon.png')} style={styles.container}>
			<Image
				source={require('../image/fonCircleProzoro.png')}
				style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
			/>
			<ActivityIndicator
				animating={animating}
				color="#FFFFFF"
				size="large"
				style={styles.activityIndicator}
			/>
		</ImageBackground>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	activityIndicator: {
		alignItems: 'center',
		height: 80,
	},
});