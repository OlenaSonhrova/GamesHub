import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View } from 'react-native';
import { GetUserCreatedGames, GetUserPlayedGames, GetUserSelectedGames, baseGet } from '../api/api';

const LocalStorage = ({ navigation}) => {

	const updatePeriod = async () => {
		const checkPeriod = await AsyncStorage.getItem('datePeriod');
		if (checkPeriod) {
			// const CLEAR_INTERVAL = 1;
			const CLEAR_INTERVAL = 15552000000;
			const period = Date.now() - parseInt(checkPeriod, 10);
			if (period >= CLEAR_INTERVAL) {
				const allTypes = await AsyncStorage.getItem('AllTypes');
				const namesTypes = JSON.parse(allTypes).types.map(type => type.name);
				for (let i = 0; i < namesTypes.length; i++) {
					const typeGame = namesTypes[i];
					await AsyncStorage.removeItem(typeGame);
				};
				AsyncStorage.removeItem('dateSave');
				await AsyncStorage.setItem('datePeriod', Date.now().toString());
			};
		} else {
			await AsyncStorage.setItem('datePeriod', Date.now().toString());
		};
	};

	useEffect(() => {
		const fetchData = async () => {
			await updatePeriod();
			const storedDateSave = await AsyncStorage.getItem('dateSave');
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
		const responseSelectedGames = await GetUserSelectedGames('/core/getUserSelectedGames/', navigation);
		const responseCreatedGames = await GetUserCreatedGames('/core/getUserCreatedGames/', navigation);
		const responsePlayedGames = await GetUserPlayedGames('/core/getUserPlayedGames/', navigation);
		await AsyncStorage.setItem('SelectedGames', JSON.stringify(responseSelectedGames));
		await AsyncStorage.setItem('CreatedGames', JSON.stringify(responseCreatedGames));
		await AsyncStorage.setItem('PlayedGames', JSON.stringify(responsePlayedGames));
		// console.log('Кількість ігор', responseAllGames?.new_games_count, responseAllGames?.updated_games_count, responseAllGames?.deleted_games_count);
		const newGames = responseAllGames?.new_games_count;
		const updatedGames = responseAllGames?.updated_games_count;
		const deletedGames = responseAllGames?.deleted_games_count;

		if (!newGames && !updatedGames) {
			// console.log('Зайшла в 0, тому, що не має ігор для додавання і оновлення');
		}

		if (deletedGames) {
			const deleted = responseAllGames?.deleted_games;
			const allTypes = await AsyncStorage.getItem('AllTypes');
			const namesTypes = JSON.parse(allTypes).types.map(type => type.name);
			for (let i = 0; i < namesTypes.length; i++) {
				const typeGame = namesTypes[i];
				const storedData = await AsyncStorage.getItem(typeGame);
				const data = JSON.parse(storedData);
				if (data) {
					const filteredData = data.filter(item => !deleted.includes(item.name));
					await AsyncStorage.setItem(typeGame, JSON.stringify(filteredData));
				}
			};
		}

		if (newGames) {
			const games = responseAllGames?.new_games;
			for (const [key, gameData] of Object.entries(games)) {
				await addNewDataLS(key, JSON.stringify(gameData));
			};
		}

		if (updatedGames) {
			const updateGame = responseAllGames?.updated_games;
			for (const [key, gameData] of Object.entries(updateGame)) {
				await updateDataLS(key, JSON.stringify(gameData));
			};
		}

		const dateUpdate = Date.now();
		await AsyncStorage.setItem('dateSave', dateUpdate.toString());
	}

	const saveDataFirstTime = async () => {
		const nameUrl = '/core/getAllGames/?' + new URLSearchParams({ game_type: null, from_timestamp_ms: null });
		const responseAllGames = await baseGet(nameUrl, navigation);
		const allGames = responseAllGames?.new_games;
		const response = await saveToLS(allGames);
		const dateUpdate = Date.now();
		await AsyncStorage.setItem('dateSave', dateUpdate.toString());
	};

	const saveToLS = async (allGames) => {
		try {
			for (const [key, gameData] of Object.entries(allGames)) {
				await AsyncStorage.setItem(key, JSON.stringify(gameData));
			};
			return 'dkjfv'
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
			// console.log('оновили ігри');
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