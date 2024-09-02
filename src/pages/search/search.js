import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from 'react-native-calendars';
import SelectDropdown from 'react-native-select-dropdown';

import FlatListComponent from '../commons/flatList';
import { GetAllGameDurations, GetAllGameLocations, GetAllMoneyRanges, GetAllPlayerAges, GetAllPlayerCounts, SearchGames, getAllGameTypes } from '../../api/api';

const Search = ({ navigation, offline, statusServer }) => {

	const imageLocal = require('../../image/search.png');

	const [name, setName] = useState(null);
	const [author, setAuthor] = useState(null);
	const [props, setProps] = useState(null);
	const [description, setDescription] = useState(null);
	const [type, setType] = useState();
	const [duration, setDuration] = useState();
	const [countPlayers, setCountPlayers] = useState();
	const [age, setAge] = useState();
	const [location, setLocation] = useState([]);
	const [money, setMoney] = useState();
	const rating = ["більше >= 0", "більше >= 1", "більше >= 2", "більше >= 3", "більше >= 4", "більше >= 5"];

	const [selectType, setSelectType] = useState(null);
	const [selectDuration, setSelectDuration] = useState(null);
	const [selectCountPlayers, setSelectCountPlayers] = useState(null);
	const [selectAge, setSelectAge] = useState(null);
	const [selectLocation, setSelectLocation] = useState(null);
	const [selectMoney, setSelectMoney] = useState(null);
	const [selectRating, setSelectRating] = useState(null);
	const [selectedDate, setSelectedDate] = useState();
	const [selectedDateFormat, setSelectedDateFormat] = useState();

	const [data, setData] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [moreOption, setMoreOption] = useState(true);
	const [showCalendar, setShowCalendar] = useState(true);


	const getDataInfa = async () => {
		setRefreshing(true);
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
		if (offline) {
		} else {
			getDataInfa();
		}
	}, [offline]);

	useEffect(() => {
		const asyncFunction = async () => {
			setRefreshing(true);
			await searchGames();
			setRefreshing(false);
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
				locations: selectLocation,
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
		setRefreshing(true);
		await searchGames();
		setRefreshing(false);
	};


	return (
		<SafeAreaView style={styles.backgroundColor}>
			{offline ? (
				<>
					<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>
						Функція пошуку доступа тільки в онлайні
					</Text>
				</>
			) : (
				<View>
					<View style={styles.request}>
						<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Пошук ігор</Text>
						<View style={styles.blockOne} >
							<TextInput
								style={[styles.inputName, styles.input]}
								placeholder="  Назва гри"
								placeholderTextColor="black"
								keyboardType="default"
								onChangeText={text => text === "" ? setName(null) : setName(text)}
								value={name}
							/>
							<Pressable style={styles.visibalaitiMore} onPress={() => { setMoreOption(!moreOption) }}>
								<Text style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Інші параметри</Text>
								<FontAwesomeIcon icon={faCaretDown} size={30} color='#8D6349' />
							</Pressable>
						</View>

						<View style={[styles.blockMoreOption, { display: moreOption ? 'none' : '' }]}>
							<View style={styles.blockTwo}>
								<TextInput
									style={[styles.inputName, styles.input]}
									placeholder="  Реквізит"
									placeholderTextColor="black"
									keyboardType="default"
									onChangeText={text => text === "" ? setProps(null) : setProps(text)}
									value={props}
								/>
								<TextInput
									style={[styles.inputName, styles.input]}
									placeholder="  Автор гри"
									placeholderTextColor="black"
									keyboardType="default"
									onChangeText={text => text === "" ? setAuthor(null) : setAuthor(text)}
									value={author}
								/>
							</View>
							<TextInput
								style={[styles.input, styles.inputLast]}
								placeholder="  Основне завдання"
								placeholderTextColor="black"
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
									defaultButtonText={<Text style={{ color: '#AAAAAA' }}>{selectType ?? 'Категорії'}</Text>}
									buttonStyle={{
										backgroundColor: selectType ? '#bebebe' : '#FAE2D4',
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
									defaultButtonText={<Text style={{ color: '#AAAAAA' }}>{selectDuration ?? 'Тривалість гри'}</Text>}
									buttonStyle={{
										backgroundColor: selectDuration ? '#bebebe' : '#FAE2D4',
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
									defaultButtonText={<Text style={{ color: '#AAAAAA' }}>{selectAge ?? 'Вік'}</Text>}
									buttonStyle={{
										backgroundColor: selectAge ? '#bebebe' : '#FAE2D4',
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
									defaultButtonText={<Text style={{ color: '#AAAAAA' }}>{selectLocation ?? 'Локація'}</Text>}
									buttonStyle={{
										backgroundColor: selectLocation ? '#bebebe' : '#FAE2D4',
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
									defaultButtonText={<Text style={{ color: '#AAAAAA' }}>{selectMoney ?? 'Фінанси'}</Text>}
									buttonStyle={{
										backgroundColor: selectMoney ? '#bebebe' : '#FAE2D4',
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
										if (selectRating === index) {
											setSelectRating(null);
										} else {
											setSelectRating(index);
										};
									}}
									defaultButtonText={<Text style={{ color: '#AAAAAA' }}>{selectRating !== null ? rating[selectRating] : 'Рейтинг'}</Text>}
									buttonStyle={{
										backgroundColor: selectRating ? '#bebebe' : '#FAE2D4',
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
									defaultButtonText={<Text style={{ color: '#AAAAAA' }}>{selectCountPlayers ?? 'Кількість учасників'}</Text>}
									buttonStyle={{
										backgroundColor: selectCountPlayers ? '#bebebe' : '#FAE2D4',
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
												color: '#AAAAAA',
												fontSize: 18,
												textAlign: 'center',
												backgroundColor: selectedDate ? '#bebebe' : '#FAE2D4',
												height: 35,
												paddingTop: 8,
												marginBottom: 10,
											}}
										>
											{showCalendar ? (selectedDate !== undefined && selectedDate !== null ? selectedDate : 'Дата з якої шукати ігри') : ''}
										</Text>
										<View style={styles.calendarWrapper}>
											<Calendar
												style={{
													display: showCalendar ? 'none' : '',
												}}
												onDayPress={(day) => {
													const [year, month, dayOfMonth] = day.dateString.split('-');
													const formattedDate = `${year}/${month}/${dayOfMonth}`;
													if (selectedDate === formattedDate) {
														setShowCalendar(!showCalendar);
														setSelectedDateFormat(day.dateString);
														setSelectedDate(null);
													} else {
														setShowCalendar(!showCalendar)
														setSelectedDateFormat(day.dateString);
														setSelectedDate(formattedDate);
													};
												}}
												markingType={'custom'}
												markedDates={{
													[selectedDateFormat]: { selected: true, selectedColor: '#06649a' },
												}}
											/>
										</View>

									</Pressable>
								</View>
							</View>

						</View>
					</View>
					<View style={styles.responce}>
						{data.length === 0 && !refreshing ? (
							<Text style={{ fontSize: 18, fontWeight: 500, color: 'black' }}>Нічого не знайдено ...</Text>
						) : (
							<FlatListComponent data={data} refreshing={refreshing} onRefresh={onRefresh} imageLocal={imageLocal} />
						)}
						<Text style={{ display: 'none' }}>JSFvkdfv ksjvb</Text>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	backgroundColor: {
		height: '100%',
		margin: 10,
	},
	request: {
		paddingBottom: 15,
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
	},
	inputName: {
		width: '48%',
	},
	inputLast: {
		marginBottom: 10,
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
