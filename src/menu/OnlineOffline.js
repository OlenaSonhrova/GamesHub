import React, { useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

const OnlineOffline = ({ changeInternet }) => {

	const [loading, setLoading] = useState(false);

	const handleLoading = () => {
		setLoading(true);
	};

	const handleLoaded = () => {
		setLoading(false);
	};

	const handelRestart = async () => {
		handleLoading();
		await changeInternet();
		handleLoaded();
		alert('З\'єднання з інтернетом не відоновленно');
	};

	return (
		<SafeAreaView >
			<LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FC742B', '#DD9425', '#FC742B']} style={styles.gradient}>
				<Pressable style={styles.container} onPress={handelRestart} >
					<Text style={styles.text}>offline</Text>
					{loading ? (
						<ActivityIndicator size="small" color="#f5eeea" />
					) : (
						<FontAwesomeIcon icon={faRepeat} size={25} color='#f5eeea' />
					)}
				</Pressable>
			</LinearGradient>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	text: {
		margin: 5,
		color: 'white',
		fontSize: 18,
	},
});

export default OnlineOffline;