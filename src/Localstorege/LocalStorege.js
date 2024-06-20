import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import { GetUserCreatedGames, GetUserSelectedGames, baseGet } from '../api/api';

const LocalStorage = ({ navigation }) => {

	const updatePeriod = async () => {
		// console.log('Date now', Date.now().toString());
		const checkPeriod = await AsyncStorage.getItem('datePeriod');
		// console.log('checkPeriod 1', checkPeriod);
		if (checkPeriod) {
			const CLEAR_INTERVAL = 15552000000;
			// const CLEAR_INTERVAL = 345;
			// console.log('checkPeriod 2', checkPeriod);
			const period = Date.now() - parseInt(checkPeriod, 10);
			// console.log('period 1', period);
			if (period >= CLEAR_INTERVAL) {
				// console.log('remove AsyncStorage 1');
				const allTypes = await AsyncStorage.getItem('AllTypes');
				const namesTypes = JSON.parse(allTypes).types.map(type => type.name);
				for (let i = 0; i < namesTypes.length; i++) {
					const typeGame = namesTypes[i];
					await AsyncStorage.removeItem(typeGame);
				};
				AsyncStorage.removeItem('dateSave');
				await AsyncStorage.setItem('datePeriod', Date.now().toString());
				// console.log('remove AsyncStorage 2');
			};
		} else {
			await AsyncStorage.setItem('datePeriod', Date.now().toString());
		};
	};

	useEffect(() => {
		const fetchData = async () => {
			await updatePeriod();
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
		const responseSelectedGames = await GetUserSelectedGames('/core/getUserSelectedGames/', navigation);
		const responseCreatedGames = await GetUserCreatedGames('/core/getUserCreatedGames/', navigation);
		// console.log(responseSelectedGames);
		await AsyncStorage.setItem('SelectedGames', JSON.stringify(responseSelectedGames));
		await AsyncStorage.setItem('CreatedGames', JSON.stringify(responseCreatedGames));
		console.log('Кількість ігор', responseAllGames?.new_games_count, responseAllGames?.updated_games_count, responseAllGames?.deleted_games_count);
		const newGames = responseAllGames?.new_games_count;
		const updatedGames = responseAllGames?.updated_games_count;
		const deletedGames = responseAllGames?.deleted_games_count;

		if (!newGames && !updatedGames) {
			// console.log('Зайшла в 0, тому, що не має ігор для додавання і оновлення');
		}

		if (deletedGames) {
			// console.log('Є ігри for deleted');
			const deleted = responseAllGames?.deleted_games;
			// console.log('deleted', deleted);
			const allTypes = await AsyncStorage.getItem('AllTypes');
			// console.log('allTypes');
			const namesTypes = JSON.parse(allTypes).types.map(type => type.name);
			// console.log('allTypes', namesTypes);
			for (let i = 0; i < namesTypes.length; i++) {
				const typeGame = namesTypes[i];
				// console.log('type', typeGame);
				const storedData = await AsyncStorage.getItem(typeGame);
				// if (typeGame === "Загальнотабірні") {
				// 	console.log('after:', storedData);
				// };
				const data = JSON.parse(storedData);
				if (data) {
					// if (typeGame === "Загальнотабірні") {
					// 	console.log('data JSON.parse1');
					// };
					const filteredData = data.filter(item => !deleted.includes(item.name));
					// if (typeGame === "Загальнотабірні") {
					// 	console.log('data finish', filteredData);
					// };
					await AsyncStorage.setItem(typeGame, JSON.stringify(filteredData));
					// console.log('data finish');
				}
			};
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
	}

	const saveDataFirstTime = async () => {
		// console.log('не має даних в сховищі, зберігаємо все по новій');
		const nameUrl = '/core/getAllGames/?' + new URLSearchParams({ game_type: null, from_timestamp_ms: null });
		const responseAllGames = await baseGet(nameUrl, navigation);
		// console.log(' локальне сховище', responseAllGames)
		const allGames = responseAllGames?.new_games;
		const response = await saveToLS(allGames);
		// console.log('всезбеігли в локальне сховище', response)
		const dateUpdate = Date.now();
		await AsyncStorage.setItem('dateSave', dateUpdate.toString());
	};

	const saveToLS = async (allGames) => {
		try {
			for (const [key, gameData] of Object.entries(allGames)) {
				await AsyncStorage.setItem(key, JSON.stringify(gameData));
				// console.log('key', key);
			};
			// console.log('все зберігли в локальному сховищі');
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
			// console.log(' додали ігри');
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