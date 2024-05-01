import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';

const GetAllGamesLocal = () => {

	const GetAllGamess = async () => {
		try {
			const idUser = await AsyncStorage.getItem('user_id');
			const url = ('http://176.36.224.228:24242/api_v1/getAllGames?' + new URLSearchParams({ user_id: idUser, type: TeamBuilding }));
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			await AsyncStorage.setItem('GetAllGamesServer', JSON.stringify(data));
			console.log("data");
		} catch (error) {
			console.log('error. did not receive data from server. Nor save them in local storege ');
		};
	};

	GetAllGamess();

	return (
		<View>
			<Text style={styles.text}>Hello</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {

	},
});


export default GetAllGamesLocal;