import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

const OnlineOffline = () => {


	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>offline</Text>
			{/* {localActivitiIndi ? ( */}
				{/* <ActivityIndicator size="large" color='#f5eeea' /> */}
			{/* ) : ( */}
				<FontAwesomeIcon icon={faRepeat} spin size={25} color='#f5eeea' />
			{/* )} */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: 40,
		backgroundColor: '#fc742b',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 20,
	},
	text: {
		// paddingLeft: 20,
		margin: 5,
		color: 'white',
		fontSize: 18,
	},
});

export default OnlineOffline;