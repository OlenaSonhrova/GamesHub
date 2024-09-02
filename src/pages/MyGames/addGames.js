import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { CreateUserGame, GetAllGameDurations, GetAllGameLocations, getAllGameTypes, GetAllMoneyRanges, GetAllPlayerAges, GetAllPlayerCounts, UpdateUserGame } from '../../api/api';

import Loader from '../../registration/components/loader';



const AddGame = ({ navigation, returnedDataAdd, returnedDataUp, item, upDate, offline }) => {


	const [name, setName] = useState('');
	const [oldName, setOldName] = useState('');
	const [type, setType] = useState([]);
	const [props, setProps] = useState('');
	const [description, setDescription] = useState('');
	const [duration, setDuration] = useState([]);
	const [countPlayers, setCountPlayers] = useState([]);
	const [age, setAge] = useState([]);
	const [location, setLocation] = useState([]);
	const [money, setMoney] = useState([]);
	const [urlName, setUrlName] = useState();



	const [selectedType, setSelectedType] = useState('');
	const [selectedDuration, setSelectedDuration] = useState('');
	const [selectedCountPlayers, setSelectedCountPlayers] = useState('');
	const [selectedAge, setSelectedAge] = useState('');
	const [selectedLocation, setSelectedLocation] = useState([]);
	const [selectedMoney, setSelectedMoney] = useState('');
	const [toggleSwitch, setToggleSwitch] = useState(false);


	const [loading, setLoading] = useState(false);
	const [animating, setAnimating] = useState(false);

	const getDataInfa = async () => {
		setLoading(true);
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

			if (upDate) {
				setName(item.name);
				setOldName(item.name);
				setProps(item.props);
				setDescription(item.description);
				setSelectedType(item.game_type);
				setSelectedDuration(item.duration_sec);
				setSelectedCountPlayers(item.count_players);
				setSelectedAge(item.player_age);
				setSelectedLocation(item.locations);
				setSelectedMoney(item.money_range);
				setToggleSwitch(item.is_private);
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		};
	};

	useEffect(() => {
		getDataInfa();
	}, []);

	useEffect(() => {
		if (offline) {
		} else {
			getDataInfa();
		}
	}, [offline]);


	const addGame = async () => {
		if (!name) { alert('Будь ласка, напишіть назву гри'); return; };
		if (!props) { alert('Будь ласка, напишить реквізит'); return; };
		if (!description) { alert('Будь ласка, напишить основне завдання '); return; };
		if (!selectedType) { alert('Будь ласка, оберіть категорію'); return; };
		if (!selectedDuration) { alert('Будь ласка, оберіть тривалість гри'); return; };
		if (!selectedCountPlayers) { alert('Будь ласка, оберіть кількість учасників'); return; };
		if (!selectedAge) { alert('Будь ласка, оберіть вік учасників'); return; };
		if (!selectedLocation) { alert('Будь ласка, оберіть локацію'); return; };
		if (!selectedMoney) { alert('Будь ласка, оберіть кількість необхідних фінансів'); return; };

		setAnimating(!animating);

		if (upDate) {
			const body = JSON.stringify({
				name: oldName,
				new_name: name,
				user_rating: 0,
				props: props,
				description: description,
				game_type: selectedType,
				duration_sec: selectedDuration,
				count_players: selectedCountPlayers,
				player_age: selectedAge,
				locations: selectedLocation,
				money_range: selectedMoney,
				is_private: toggleSwitch
			});
			const nameUrl = '/core/updateUserGame/';
			const response = await UpdateUserGame(nameUrl, body, navigation);
			if (response?.status !== 200 && response?.status !== 201) {
				setAnimating(false);
				const status = await response.json();
				if (status?.link_to_site == "Enter a valid URL.") {
					Alert.alert("Помилка", "Введіть дійсну URL-адресу");
					return;
				};
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return;
			};
			setAnimating(!animating);
			const newGame = await response.json();
			returnedDataUp(newGame, oldName);
		} else {
			const body = JSON.stringify({
				name: name,
				user_rating: 0,
				props: props,
				description: description,
				game_type: selectedType,
				duration_sec: selectedDuration,
				count_players: selectedCountPlayers,
				player_age: selectedAge,
				locations: selectedLocation,
				money_range: selectedMoney,
				link_to_site: urlName,
				is_private: toggleSwitch
			});
			const nameUrl = '/core/createUserGame/';
			const response = await CreateUserGame(nameUrl, body, navigation);
			if (response?.status !== 200 && response?.status !== 201) {
				setAnimating(false);
				const status = await response.json();
				if (status?.link_to_site == "Enter a valid URL.") {
					Alert.alert("Помилка", "Введіть дійсну URL-адресу");
					return;
				};
				Alert.alert("Помилка", "Сервер не відповідає! спробуйте ще раз");
				return;
			};
			setAnimating(!animating);
			const newGame = await response.json();
			returnedDataAdd(newGame);
		};
	};


	return (
		<SafeAreaView style={styles.container}>
			{loading ? <Loader /> : <ScrollView
				keyboardShouldPersistTaps="always"
				keyboardDismissMode="on-drag"
				style={styles.inputContainer}
			>
				<View style={styles.inputAddGameBlock}>
					<TextInput
						style={styles.input}
						placeholder="Назва гри*"
						keyboardType="default"
						placeholderTextColor="black"
						onChangeText={text => setName(text)}
						maxLength={255}
						value={name}
					/>
					<TextInput
						style={styles.input}
						placeholder="Реквізит*"
						placeholderTextColor="black"
						keyboardType="default"
						onChangeText={text => setProps(text)}
						value={props}
					/>
					<TextInput
						style={[styles.input, styles.inputArea]}
						multiline={true}
						numberOfLines={10}
						placeholder="Основне завдання*"
						placeholderTextColor="black"
						keyboardType="default"
						onChangeText={text => setDescription(text)}
						value={description}
						textAlignVertical="top"
					/>
					<Text style={styles.valueText}>Категорія: *</Text>
					<View style={styles.block}>
						{type.map((typeItem, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedType === typeItem ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedType(typeItem) }}>
									<View>
										<Text style={styles.blockText}>{typeItem}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Тривалість гри: *</Text>
					<View style={styles.block}>
						{duration.map((durationItem, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedDuration === durationItem ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedDuration(durationItem) }}>
									<View>
										<Text style={styles.blockText}>{durationItem} хв.</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Кількість учасників: *</Text>
					<View style={styles.block}>
						{countPlayers.map((countPlayersItem, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedCountPlayers === countPlayersItem ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedCountPlayers(countPlayersItem) }}>
									<View>
										<Text style={styles.blockText}>{countPlayersItem}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Вік (років): *</Text>
					<View style={styles.block}>
						{age.map((ageItem, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedAge === ageItem ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedAge(ageItem) }}>
									<View>
										<Text style={styles.blockText}>{ageItem}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Локація: * <Text style={styles.valueTextSmall}> (можна обрати декілька варіантів)</Text></Text>
					<View style={styles.block}>
						{location.map((locationItem, index) => {
							const isSelected = selectedLocation.includes(locationItem);
							return (
								<Pressable
									key={index}
									style={{
										backgroundColor: isSelected ? '#B66A53' : '#FAE2D4',
									}}
									onPress={() => {
										if (isSelected) {
											setSelectedLocation(selectedLocation.filter((loc) => loc !== locationItem));
										} else {
											setSelectedLocation([...selectedLocation, locationItem]);
										}
									}}
								>
									<View>
										<Text style={styles.blockText}>{locationItem}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Фінанси (грн): *</Text>
					<View style={styles.block}>
						{money.map((moneyItem, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedMoney === moneyItem ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedMoney(moneyItem) }}>
									<View>
										<Text style={styles.blockText}>{moneyItem}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<View>
						<Text style={styles.valueText}>Посилання на гру: </Text>
						<TextInput
							style={styles.input}
							placeholder="url адреса"
							keyboardType="default"
							placeholderTextColor="black"
							onChangeText={text => setUrlName(text)}
							maxLength={255}
							value={urlName}
						/>
					</View>
					<View style={styles.containerSwitch}>
						<Text style={styles.containerSwitchText}>Приватна гра: * </Text>
						<Switch
							trackColor={{ false: '#FAE2D4', true: '#B66A53' }}
							style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }], marginTop: 10, }}
							value={toggleSwitch}
							thumbColor={'#fff'}
							onChange={() => setToggleSwitch(!toggleSwitch)}
						/>
					</View>
					<View style={styles.buttonCenter}>
						<Pressable onPress={addGame} style={styles.button}>
							<Text style={styles.buttonText}>Зберегти</Text>
							<ActivityIndicator
								animating={animating}
								color="#000000"
								size="large"
								style={styles.activityIndicator}
							/>
						</Pressable>
					</View>
				</View>
			</ScrollView>}
			{/* <Text style={{ fontSize: 30, textAlign: "center", marginBottom: 30, fontWeight: 'bold' }}></Text> */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '90%',
	},
	inputAddGameBlock: {
		marginLeft: 12,
		marginRight: 12,
	},
	input: {
		height: 40,
		marginTop: 5,
		marginBottom: 5,
		borderWidth: 1,
		padding: 10,
	},
	button: {
		alignItems: 'center',
		paddingLeft: 60,
		paddingRight: 20,
		borderRadius: 4,
		backgroundColor: '#FAE2D4',
		marginTop: 15,
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
	},
	buttonText: {
		color: 'black',
		fontSize: 24,
		fontWeight: 'bold',
	},
	buttonCenter: {
		display: 'flex',
		alignItems: 'center',
	},
	inputArea: {
		height: 160,
	},
	block: {
		display: 'flex',
		gap: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	blockText: {
		textAlign: 'center',
		margin: 8,
		color: '#0000009a',
	},
	valueText: {
		fontWeight: 'bold',
		fontSize: 20,
		paddingTop: 10,
		color: '#000000ab',
	},
	valueTextSmall: {
		fontSize: 14,
		fontWeight: '400',
		color: '#000000ab',
		paddingTop: 10,
	},
	containerSwitch: {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		alignItems: 'center',
	},
	containerSwitchText: {
		fontWeight: 'bold',
		fontSize: 20,
		paddingTop: 10,
		color: '#000000ab',
	},
	activityIndicator: {
		height: 80,
	},
});

export default AddGame;