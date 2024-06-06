import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from 'react-native-calendars';
import SelectDropdown from 'react-native-select-dropdown';

import FlatListComponent from '../commons/flatList';
import { GetAllGameDurations, GetAllGameLocations, GetAllMoneyRanges, GetAllPlayerAges, GetAllPlayerCounts, SearchGames, getAllGameTypes } from '../../api/api';
import Loader from '../../registration/components/loader';

const Search = ({ navigation }) => {

	const imageLocal = require('../../image/search.png');

	const [name, setName] = useState(null);
	const [author, setAuthor] = useState(null);
	const [props, setProps] = useState(null);
	const [description, setDescription] = useState(null);
	const [type, setType] = useState();
	const [duration, setDuration] = useState();
	const [countPlayers, setCountPlayers] = useState();
	const [age, setAge] = useState();
	const [location, setLocation] = useState();
	const [money, setMoney] = useState();
	const rating = ["більше >= 0", "більше >= 1", "більше >= 2", "більше >= 3", "більше >= 4", "= 5"];

	const [selectType, setSelectType] = useState(null);
	const [selectDuration, setSelectDuration] = useState(null);
	const [selectCountPlayers, setSelectCountPlayers] = useState(null);
	const [selectAge, setSelectAge] = useState(null);
	const [selectLocation, setSelectLocation] = useState(null);
	const [selectMoney, setSelectMoney] = useState(null);
	const [selectRating, setSelectRating] = useState(null);
	const [selectedDate, setSelectedDate] = useState();

	const [data, setData] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [moreOption, setMoreOption] = useState(true);
	const [showCalendar, setShowCalendar] = useState(true);


	const getDataInfa = async () => {
		// setRefreshing(true);
		try {
			const type = await getAllGameTypes('/core/getAllGameTypes/', navigation);
			const typeName = type?.types.map(item => item.name);

			const location = await GetAllGameLocations('/core/getAllGameLocations/', navigation);
			const age = await GetAllPlayerAges('/core/getAllPlayerAges/', navigation);
			const count = await GetAllPlayerCounts('/core/getAllPlayerCounts/', navigation);
			const money = await GetAllMoneyRanges('/core/getAllMoneyRanges/', navigation);
			const duration = await GetAllGameDurations('/core/getAllGameDurations/', navigation);
			setType(typeName);
			setLocation(location?.locations);
			setAge(age?.ages);
			setCountPlayers(count?.counts);
			setMoney(money?.ranges);
			setDuration(duration?.durations);

			setRefreshing(false);
		} catch (error) {
			setRefreshing(false);
			console.error(error);
		};
	};

	useEffect(() => {
		getDataInfa();
	}, []);



	useEffect(() => {
		const asyncFunction = async () => {
			await searchGames();
		};
		asyncFunction();
	}, [selectType, selectDuration, selectCountPlayers, selectAge, selectLocation, selectMoney, name, props, description, selectRating, author, selectedDate]);


	const searchGames = async () => {
		try {
			setData([]);
			const body = JSON.stringify({
				name: name,
				props: props,
				description: description,
				game_type: selectType,
				duration_sec: selectDuration,
				count_players: selectCountPlayers,
				player_age: selectAge,
				location: selectLocation,
				money_range: selectMoney,
				average_rating: selectRating,
				author: author,
				creation_date: selectedDate
			});
			const response = await SearchGames(body, navigation);
			setData(response)
		} catch (error) {
			console.error(error);
			return <Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Перевірте з'днання з Інтернетом</Text>
		};
	};

	const onRefresh = async () => {
		// setRefreshing(true);
		await searchGames();
		setRefreshing(false);
	};

	if (refreshing) {
		return <Loader />
	};

	return (
		<SafeAreaView style={styles.backgroundColor}>
			<View style={styles.request}>
				<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Пошук ігор</Text>
				<View style={styles.blockOne} >
					<TextInput
						style={[styles.inputName, styles.input]}
						placeholder="Назва гри"
						keyboardType="default"
						onChangeText={text => text === "" ? setName(null) : setName(text)}
						value={name}
					/>
					<Pressable style={styles.visibalaitiMore} onPress={() => { setMoreOption(!moreOption) }}>
						<Text style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Інші параметри</Text>
						<FontAwesomeIcon icon={faCaretDown} size={30} color='#8D6349' />
					</Pressable>
				</View>

				<View style={{ display: moreOption ? 'none' : '' }}>
					<View style={styles.blockTwo}>
						<TextInput
							style={[styles.inputName, styles.input]}
							placeholder=" Реквізит"
							keyboardType="default"
							onChangeText={text => text === "" ? setProps(null) : setProps(text)}
							value={props}
						/>
						<TextInput
							style={[styles.inputName, styles.input]}
							placeholder="Автор гри"
							keyboardType="default"
							onChangeText={text => text === "" ? setAuthor(null) : setAuthor(text)}
							value={author}
						/>
					</View>

					<TextInput
						style={styles.input}
						placeholder="Основне завдання"
						keyboardType="default"
						onChangeText={text => text === "" ? setDescription(null) : setDescription(text)}
						value={description}
					/>

					<View style={styles.blockCateori}>
						<SelectDropdown
							data={type}
							key={selectType || "defaultKey1"}
							onSelect={(selectedItem) => {
								if (selectedItem === selectType) {
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
							key={selectDuration || "defaultKey2"}
							onSelect={(selectedItem) => {
								if (selectedItem === selectDuration) {
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
							key={selectAge || "defaultKey3"}
							onSelect={(selectedItem) => {
								if (selectedItem === selectAge) {
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
							key={selectLocation || "defaultKey4"}
							onSelect={(selectedItem) => {
								if (selectedItem === selectLocation) {
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
							key={selectMoney || "defaultKey5"}
							onSelect={(selectedItem) => {
								if (selectedItem === selectMoney) {
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
							key={selectRating || "defaultKey6"}
							onSelect={(selectedItem, index) => {
								if (selectRating  === index) {
									setSelectRating(null);
								} else {
									setSelectRating(index);
								};
							}}
							defaultButtonText={selectRating !== null ? rating[selectRating] : 'Рейтинг'}
							buttonStyle={{
								backgroundColor: '#FAE2D4',
								width: '49%',
								height: 35,
								marginBottom: 2,
							}}
							selectedRowStyle={{
								backgroundColor: '#bebebe',
							}}
							defaultValue={rating[selectRating]}
						/>
						<SelectDropdown
							data={countPlayers}
							key={selectCountPlayers || "defaultKey7"}
							onSelect={(selectedItem) => {
								if (selectedItem === selectCountPlayers) {
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
						<View style={{ width: '100%', }}>
							<Pressable onPress={() => { setShowCalendar(!showCalendar) }}>
								<Text
									style={{
										display: showCalendar ? 'flex' : 'none',
										color: 'black',
										fontSize: 18,
										textAlign: 'center',
										backgroundColor: '#FAE2D4',
										height: 35,
										paddingTop: 8,
										marginBottom: 10,
									}}
								>
									{showCalendar ? 'Дата з якої шукати ігри' : ''}
								</Text>
								<View style={styles.calendarWrapper}>
									<Calendar
										style={{
											display: showCalendar ? 'none' : '',
											// height: 250,
										}}
										onDayPress={(day) => {
											const [year, month, dayOfMonth] = day.dateString.split('-');
											const formattedDate = `${year}/${month}/${dayOfMonth}`;
											if (selectedDate === formattedDate) {
												setShowCalendar(!showCalendar);
												console.log('formattedDate 1', formattedDate);
												setSelectedDate(null);
											} else {
												setShowCalendar(!showCalendar)
												console.log('formattedDate 2', formattedDate);
												setSelectedDate(formattedDate);
											};

										}}
										markedDates={{
											[selectedDate]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
										}}
									/>
								</View>

							</Pressable>
						</View>
					</View>

				</View>
			</View>
			<View style={styles.responce}>
				<FlatListComponent data={data} refreshing={refreshing} onRefresh={onRefresh} imageLocal={imageLocal} />
				<Text style={{ display: 'none' }}>JSFvkdfv ksjvb</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backgroundColor: {
		height: '100%',
		margin: 10,
	},
	responce: {
		height: '85%',
	},
	blockCateori: {
		display: 'flex',
		flexDirection: 'row',
		gap: 1,
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
	blockOne: {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
	},
	blockTwo: {
		display: 'flex',
		flexDirection: 'row',
		gap: 15,
	},
	input: {
		height: 35,
		marginTop: 1,
		marginBottom: 3,
		borderWidth: 1,
		padding: 10,
	},
	inputName: {
		width: '48%'
	},
	text: {
		color: 'black',
		fontSize: 24,
	},
	visibalaitiMore: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		width: '45%'
	},
});

export default Search;
