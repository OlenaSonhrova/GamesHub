import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import { baseGet } from '../api/api';

const LocalStorage = ({ navigation }) => {
	
	useEffect(() => {
		const fetchData = async () => {
			const storedDateSave = await AsyncStorage.getItem('dateSave');
			// console.log('storedDateSave', storedDateSave);
			if (storedDateSave) {
				fetchAndStoreData(storedDateSave);
			} else {
				saveDataFirstTime();
			};
		};
		fetchData();
	}, []);
	
	const fetchAndStoreData = async (storedDateSave) => {

		const nameUrl = '/core/getAllGames/?' + new URLSearchParams({ from_timestamp_ms: storedDateSave });
		const responseAllGames = await baseGet(nameUrl, navigation);
		console.log('Кількість ігор', responseAllGames?.new_games_count, responseAllGames?.updated_games_count);
		const newGames = responseAllGames?.new_games_count;
		const updatedGames = responseAllGames?.updated_games_count;

		if (!newGames && !updatedGames) {
			// console.log('Зайшла в 0, тому, що не має ігор для додавання і оновлення');
		}

		if (newGames) {
			// console.log('Є нові ігри');
			const games = responseAllGames?.new_games;
			for (const [key, gameData] of Object.entries(games)) {
				await addNewDataLS(key, JSON.stringify(gameData));
			};
		}

		if (updatedGames) {
			// console.log('Є онрвленні ігри');
			const updateGame = responseAllGames?.updated_games;
			for (const [key, gameData] of Object.entries(updateGame)) {
				await updateDataLS(key, JSON.stringify(gameData));
			};
		}

		const dateUpdate = Date.now();
		await AsyncStorage.setItem('dateSave', dateUpdate.toString());
		// console.log('storedDateSave2', dateUpdate);

	};

	const saveDataFirstTime = async () => {
		console.log('не має даних в сховищі, зберігаємо все по новій');
		const nameUrl = '/core/getAllGames/?' + new URLSearchParams({ game_type: null, from_timestamp_ms: null });
		const responseAllGames = await baseGet(nameUrl, navigation);
		const allGames = responseAllGames?.new_games;
		saveToLS(allGames);
		const dateUpdate = Date.now();
		await AsyncStorage.setItem('dateSave', dateUpdate.toString());
	};

	const saveToLS = async (allGames) => {
		try {
			for (const [key, gameData] of Object.entries(allGames)) {
				await AsyncStorage.setItem(key, JSON.stringify(gameData));
			};
			console.log('все зберігли в локальному сховищі');
		} catch (error) {
			console.error('Error storeAllGames', error)
		};
	};

	const addNewDataLS = async (key, newData) => {
		try {
			const existingData = await AsyncStorage.getItem(key);
			if (existingData) {
				const mergedData = [...JSON.parse(existingData), ...JSON.parse(newData)];
				await AsyncStorage.setItem(key, JSON.stringify(mergedData));
			} else {
				await AsyncStorage.setItem(key, JSON.stringify(newData));
			};
			console.log(' додали ігри');
		} catch (error) {
			console.error('Error addNewDataToLocalStorage', error);
		}
	};

	const updateDataLS = async (key, newData) => {
		try {
			const existingData = await AsyncStorage.getItem(key);
			const updatedData = JSON.parse(existingData).map((item) => {
				const matchingItem = JSON.parse(newData).find((itemTwo) => itemTwo.name === item.name);
				return matchingItem || item;
			});
			await AsyncStorage.setItem(key, JSON.stringify(updatedData));
			console.log('оновили ігри');
		} catch (error) {
			console.error('Error updateDataToLocalStorage', error);
		}
	};


	return (
		<View>
			{/* <Text style={styles.text}>Hello</Text> */}
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
	},
});


export default LocalStorage;