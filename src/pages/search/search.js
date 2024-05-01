import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';

import FlatListComponent from '../commons/flatList';

const type = ["Очистисти вибране", "TeamBuilding", "Криголами", "Челенджі", "IQ", "Естафети", "Загальнотабірні", "Інші"];
const location = ["Очистисти вибране", "Вулиця", "Спортзал", "Спортивний майданчик", "Приміщення", "Online", "Поле", "Гори", "Ліс", "Море", "Інше"];
const age = ["Очистисти вибране", "1-4", "5-9", "10-14", "15+", "30+", "1-99"];
const money = ["Очистисти вибране", "0", "1-50", "50-100", "100-200", "200-500", "500+"];
const duration = ["Очистисти вибране", "1", "2", "5", "10", "20+"];
const countPlayers = ['Очистисти вибране', "1-5", "1-10", "10-30", "30+"];
const rating = ["Очистисти вибране", "більше > 1", "більше > 2", "більше > 3", "більше > 4",];


const Search = () => {

	const [name, setName] = useState(null);
	const [selectType, setSelectType] = useState(null);
	const [props, setProps] = useState(null);
	const [description, setDescription] = useState(null);
	const [selectDuration, setSelectDuration] = useState(null);
	const [selectCountPlayers, setSelectCountPlayers] = useState(null);
	const [selectAge, setSelectAge] = useState(null);
	const [selectLocation, setSelectLocation] = useState(null);
	const [selectMoney, setSelectMoney] = useState(null);
	const [selectRating, setSelectRating] = useState(null);

	const [data, setData] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const image = require('../../image/search.png');

	useEffect(() => {
		if (selectType || selectDuration || selectCountPlayers || selectAge || selectLocation || selectMoney || name || props || description || selectRating) {
			searchGames();
		}
	}, [selectType, selectDuration, selectCountPlayers, selectAge, selectLocation, selectMoney, name, props, description, selectRating]);

	const searchGames = async () => {
		try {
			setData([]);
			const url = "http://176.36.224.228:24242/api_v1/searchGames";
			const idUser = await AsyncStorage.getItem('user_id');
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: name,
					type: selectType,
					props: props,
					description: description,
					duration_sec: selectDuration,
					count_players: selectCountPlayers,
					age: selectAge,
					location: selectLocation,
					money: selectMoney,
					average_rating: selectRating,
					user_id: idUser,
				}),
			});
			const json = await response.json();
			setData(json?.games)
		} catch (error) {
			console.error(error);
			alert('Opssss.searchGames ', error);
		};
	};


	const onRefresh = useCallback(() => {
		setRefreshing(true);
		searchGames();
		setRefreshing(false);
	}, [searchGames]);


	const handleSelectedGameChange = (selectedGames) => {
		setData(selectedGames);
	};


	return (
		<SafeAreaView style={styles.backgroundColor}>
			<View style={styles.request}>
				<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Пошук ігор</Text>
				<View style={styles.blockCateori}>
					<SelectDropdown
						data={type}
						onSelect={(selectedItem) => {
							console.log(selectedItem);
							if (selectedItem === type[0]) {
								console.log(selectedItem);
								setSelectType(null);
							} else {
								setSelectType(selectedItem);
							};
						}}
						defaultButtonText={selectType ?? 'Категорії'}
						buttonStyle={{
							backgroundColor: '#FAE2D4',
							width: '49%',
							height: 35,
							marginBottom: 2,
						}}
						selectedRowStyle={{
							backgroundColor: '#bebebe',
						}}
						defaultValue={selectType}
					/>
					<SelectDropdown
						data={duration}
						onSelect={(selectedItem) => {
							console.log(selectedItem);
							if (selectedItem === duration[0]) {
								setSelectDuration(null);
							} else {
								setSelectDuration(selectedItem);
							};
						}}
						defaultButtonText={selectDuration ?? 'Тривалість гри'}
						buttonStyle={{
							backgroundColor: '#FAE2D4',
							width: '49%',
							height: 35,
							marginBottom: 2,
						}}
						selectedRowStyle={{
							backgroundColor: '#bebebe',
						}}
						defaultValue={selectDuration}
					/>
					<SelectDropdown
						data={age}
						onSelect={(selectedItem) => {
							console.log(selectedItem);
							if (selectedItem === age[0]) {
								setSelectAge(null);
							} else {
								setSelectAge(selectedItem);
							};
						}}
						defaultButtonText={selectAge ?? 'Вік'}
						buttonStyle={{
							backgroundColor: '#FAE2D4',
							width: '49%',
							height: 35,
							marginBottom: 2,
						}}
						selectedRowStyle={{
							backgroundColor: '#bebebe',
						}}
						defaultValue={selectAge}
					/>
					<SelectDropdown
						data={location}
						onSelect={(selectedItem) => {
							console.log(selectedItem);
							if (selectedItem === location[0]) {
								setSelectLocation(null);
							} else {
								setSelectLocation(selectedItem);
							};
						}}
						defaultButtonText={selectLocation ?? 'Локація'}
						buttonStyle={{
							backgroundColor: '#FAE2D4',
							width: '49%',
							height: 35,
							marginBottom: 2,
						}}
						selectedRowStyle={{
							backgroundColor: '#bebebe',
						}}
						defaultValue={selectLocation}
					/>
					<SelectDropdown
						data={money}
						onSelect={(selectedItem) => {
							console.log(selectedItem);
							if (selectedItem === money[0]) {
								setSelectMoney(null);
							} else {
								setSelectMoney(selectedItem);
							};
						}}
						defaultButtonText={selectMoney ?? 'Фінанси'}
						buttonStyle={{
							backgroundColor: '#FAE2D4',
							width: '49%',
							height: 35,
							marginBottom: 2,
						}}
						selectedRowStyle={{
							backgroundColor: '#bebebe',
						}}
						defaultValue={selectMoney}
					/>
					<SelectDropdown
						data={rating}
						onSelect={(selectedItem) => {
							console.log(selectedItem);
							if (selectedItem === rating[0]) {
								setSelectRating(null);
							} else {
								setSelectRating(selectedItem);
							};
						}}
						defaultButtonText={selectRating ?? 'Рейтинг'}
						buttonStyle={{
							backgroundColor: '#FAE2D4',
							width: '49%',
							height: 35,
							marginBottom: 2,
						}}
						selectedRowStyle={{
							backgroundColor: '#bebebe',
						}}
						defaultValue={selectRating}
					/>
					<SelectDropdown
						data={countPlayers}
						onSelect={(selectedItem) => {
							console.log(selectedItem);
							if (selectedItem === countPlayers[0]) {
								setSelectCountPlayers(null);
							} else {
								setSelectCountPlayers(selectedItem);
							};
						}}
						defaultButtonText={selectCountPlayers ?? 'Кількість учасників'}
						buttonStyle={{
							backgroundColor: '#FAE2D4',
							width: '100%',
							height: 35,
							marginBottom: 5,
						}}
						selectedRowStyle={{
							backgroundColor: '#bebebe',
						}}
						defaultValue={selectCountPlayers}
					/>
				</View>
				<TextInput
					style={styles.input}
					placeholder="Назва гри"
					keyboardType="default"
					onChangeText={text => setName(text)}
					value={name}
				/>
				<TextInput
					style={styles.input}
					placeholder="Реквізит"
					keyboardType="default"
					onChangeText={text => setProps(text)}
					value={props}
				/>
				<TextInput
					style={styles.input}
					placeholder="Основне завдання"
					keyboardType="default"
					onChangeText={text => setDescription(text)}
					value={description}
				/>
			</View>
			<View style={styles.responce}>
				<FlatListComponent data={data} refreshing={refreshing} onRefresh={onRefresh} image={image} handleSelectedGameChange={handleSelectedGameChange} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backgroundColor: {
		height: '100%',
		margin: 10,
	},
	blockCateori: {
		display: 'flex',
		flexDirection: 'row',
		gap: 1,
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	input: {
		height: 35,
		marginTop: 1,
		marginBottom: 3,
		borderWidth: 1,
		padding: 10,
	},
	text: {
		color: 'black',
		fontSize: 24,
	},
});

export default Search;
