import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const OnlineOffline = () => {

	return (
		<View>
			<Image style={{marginRight: 20}} source={require('../image/online.png')}></Image>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {

	},
});

export default OnlineOffline;