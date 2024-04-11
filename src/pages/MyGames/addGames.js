import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const type = ["TeamBuilding", "Криголами", "Челенджі", "IQ", "Естафети", "Загальнотабірні", "Інші"];
const location = ["Вулиця", "Спортзал", "Спортивний майданчик", "Приміщення", "Online", "Поле", "Гори", "Ліс", "Море", "Інше"];
const age = ["1-4", "5-9", "10-14", "15+", "30+", "1-99"];
const money = ["0", "1-50", "50-100", "100-200", "200-500", "500+"];
const duration = ["1", "2", "5", "10", "20+"];
const countPlayers = ["1-5", "1-10", "10-30", "30+"];

const AddGame = ({ onDataSubmit, details, upDate, gameIdForUpDAteInfa }) => {

	const [name, setName] = useState('');
	const [newType, setNewType] = useState(type);
	const [props, setProps] = useState('');
	const [description, setDescription] = useState('');
	const [newDuration, setNewDuration] = useState(duration);
	const [newCountPlayers, setNewCountPlayers] = useState(countPlayers);
	const [newAge, setNewAge] = useState(age);
	const [newLocation, setNewLocation] = useState(location);
	const [newMoney, setNewMoney] = useState(money);

	const [selectedType, setSelectedType] = useState('');
	const [selectedDuration, setSelectedDuration] = useState('');
	const [selectedCountPlayers, setSelectedCountPlayers] = useState('');
	const [selectedAge, setSelectedAge] = useState('');
	const [selectedLocation, setSelectedLocation] = useState('');
	const [selectedMoney, setSelectedMoney] = useState('');

	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	const formattedDate = `${year}/${month}/${day}`;


	useEffect(() => {
		if (upDate) {
			const game = details.filter(item => item.game_id === gameIdForUpDAteInfa);
			setName(game[0]?.name);
			setProps(game[0]?.props);
			setDescription(game[0]?.description);
			setSelectedType(game[0]?.type);
			setSelectedDuration(game[0]?.duration_sec);
			setSelectedCountPlayers(game[0]?.count_players);
			setSelectedAge(game[0]?.age);
			setSelectedLocation(game[0]?.location);
			setSelectedMoney(game[0]?.money);
		}
	}, [upDate, details, gameIdForUpDAteInfa]);

	const getDataInfa = async () => {
		try {
			const id = await AsyncStorage.getItem('user_id');
			const urlType = ('http://176.36.224.228:24242/api_v1/getAllGameTypes?' + new URLSearchParams({ user_id: id }));
			const urlLocation = ('http://176.36.224.228:24242/api_v1/getAllGameLocations?' + new URLSearchParams({ user_id: id }));
			const urlAge = ('http://176.36.224.228:24242/api_v1/getAllPlayerAges?' + new URLSearchParams({ user_id: id }));
			const urlMoney = ('http://176.36.224.228:24242/api_v1/getAllMoneyRanges?' + new URLSearchParams({ user_id: id }));
			const urlDuration = ('http://176.36.224.228:24242/api_v1/getAllGameDurations?' + new URLSearchParams({ user_id: id }));
			const urlCountPlayers = ('http://176.36.224.228:24242/api_v1/getAllPlayerCounts?' + new URLSearchParams({ user_id: id }));

			const responseType = await fetch(urlType);
			const responseLocation = await fetch(urlLocation);
			const responseAge = await fetch(urlAge);
			const responseMoney = await fetch(urlMoney);
			const responseDuration = await fetch(urlDuration);
			const responseCountPlayers = await fetch(urlCountPlayers);

			const jsonType = await responseType.json();
			const jsonLocation = await responseLocation.json();
			const jsonAge = await responseAge.json();
			const jsonMoney = await responseMoney.json();
			const jsonDuration = await responseDuration.json();
			const jsonCountPlayers = await responseCountPlayers.json();

			const newArrType = [...newType];
			for (let i = 0; i < jsonType?.types.length; i++) {
				newArrType[i] = jsonType?.types[i];
			};
			setNewType(newArrType);

			const newArrLocation = [...newLocation];
			for (let i = 0; i < jsonLocation?.locations.length; i++) {
				newArrLocation[i] = jsonLocation?.locations[i];
			};
			setNewLocation(newArrLocation);

			const newArrAge = [...newAge];
			for (let i = 0; i < jsonAge?.ages.length; i++) {
				newArrAge[i] = jsonAge?.ages[i];
			};
			setNewAge(newArrAge);

			const newArrMoney = [...newMoney];
			for (let i = 0; i < jsonMoney?.ranges.length; i++) {
				newArrMoney[i] = jsonMoney?.ranges[i];
			};
			setNewMoney(newArrMoney);

			const newArrDuration = [...newDuration];
			for (let i = 0; i < jsonDuration?.durations.length; i++) {
				newArrDuration[i] = jsonDuration?.durations[i];
			};
			setNewDuration(newArrDuration);

			const newArrCountPlayers = [...newCountPlayers];
			for (let i = 0; i < jsonCountPlayers?.counts.length; i++) {
				newArrCountPlayers[i] = jsonCountPlayers?.counts[i];
			};
			setNewCountPlayers(newArrCountPlayers);

		} catch (error) {
			console.error(error);
		};
	};

	useEffect(() => {
		getDataInfa();
	}, []);

	const pressDuration = (item) => {
		console.log(item);
		setSelectedDuration(item);
	};

	const pressType = (item) => {
		console.log(item);
		setSelectedType(item);
	};

	const pressCountPlayers = (item) => {
		console.log(item);
		setSelectedCountPlayers(item);
	};

	const pressAge = (item) => {
		console.log(item);
		setSelectedAge(item);
	};

	const pressLocation = (item) => {
		console.log(item);
		setSelectedLocation(item);
	};

	const pressMoney = (item) => {
		console.log(item);
		setSelectedMoney(item);
	};

	const addGame = async () => {
		if (!name) {
			alert('Будь ласка, напишіть назву гри');
			return;
		}
		if (!props) {
			alert('Будь ласка, напишить реквізит');
			return;
		}
		if (!description) {
			alert('Будь ласка, напишить основне завдання ');
			return;
		}
		if (!selectedType) {
			alert('Будь ласка, оберіть категорію');
			return;
		}
		if (!selectedDuration) {
			alert('Будь ласка, оберіть тривалість гри');
			return;
		}
		if (!selectedCountPlayers) {
			alert('Будь ласка, оберіть кількість учасників');
			return;
		}
		if (!selectedAge) {
			alert('Будь ласка, оберіть вік учасників');
			return;
		}
		if (!selectedLocation) {
			alert('Будь ласка, оберіть локацію');
			return;
		}
		if (!selectedMoney) {
			alert('Будь ласка, оберіть кількість необхідних фінансів');
			return;
		}
		
		const dataToSend = "відповідь, щоб закрилось вікно додавання гри";
		onDataSubmit(dataToSend);

		if (upDate) {
			try {
				const url = "http://176.36.224.228:24242/api_v1/updateUserGame";
				const idUser = await AsyncStorage.getItem('user_id');
				// console.log(idUser);
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: name,
						type: selectedType,
						props: props,
						description: description,
						duration_sec: selectedDuration,
						count_players: selectedCountPlayers,
						age: selectedAge,
						location: selectedLocation,
						money: selectedMoney,
						game_id: gameIdForUpDAteInfa,
						user_id: idUser,
						user_rating: 0,
					}),
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const json = await response.json();
				if (json?.status === 'ERROR') {
					alert(json?.error);
					return;
				};
				const dataToSend = {
					name: name,
					type: selectedType,
					props: props,
					description: description,
					duration_sec: selectedDuration,
					count_players: selectedCountPlayers,
					age: selectedAge,
					location: selectedLocation,
					money: selectedMoney,
					game_id: gameIdForUpDAteInfa,
					user_id: idUser,
					user_rating: 0,
				};
				onDataSubmit(dataToSend);
				// console.log(json?.status);
				// console.log(json?.error);
				// console.log(json?.data);
			} catch (error) {
				console.error(error);
				console.log(error.message);
			};
		} else {
		// console.log('Start test');
		// for (let index = 0; index < 300; index++) {
		// }
			// console.log('Finish');
		try {
				const url = "http://176.36.224.228:24242/api_v1/createUserGame";
				const idUser = await AsyncStorage.getItem('user_id');
				const response = await fetch(url, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name: name,
						type: selectedType,
						user_rating: 0,
						props: props,
						description: description,
						duration_sec: selectedDuration,
						count_players: selectedCountPlayers,
						age: selectedAge,
						location: selectedLocation,
						money: selectedMoney,
						user_id: idUser,
					}),
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const json = await response.json();
				if (json?.status === 'ERROR') {
					alert(json?.error);
					return;
				};
				const dataToSend = {
					name: name,
					type: selectedType,
					user_rating: 0,
					props: props,
					description: description,
					duration_sec: selectedDuration,
					count_players: selectedCountPlayers,
					age: selectedAge,
					location: selectedLocation,
					money: selectedMoney,
					user_id: idUser,
					creation_date: formattedDate,
					game_id: json?.data?.game_id,
				};
				onDataSubmit(dataToSend);				
				// console.log(json);
				// console.log(json?.status);
				// console.log(json?.data);
			} catch (error) {
				console.log(json?.status);
				console.error(error);
				console.log(error.message);
			};
		};
	};


	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				keyboardShouldPersistTaps="always"
				keyboardDismissMode="on-drag"
				style={styles.inputContainer}
			>
				<View style={styles.inputAddGameBlock}>
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
						style={[styles.input, styles.inputArea]}
						multiline={true}
						numberOfLines={10}
						placeholder="Основне завдання"
						keyboardType="default"
						onChangeText={text => setDescription(text)}
						value={description}
					/>
					<Text style={styles.valueText}>Категорія:</Text>
					<View style={styles.block}>
						{newType.map((type) => {
							return (
								<Pressable key={type} style={{ backgroundColor: selectedType === type ? '#B66A53' : '#FAE2D4' }} onPress={() => pressType(type)}>
									<View>
										<Text style={styles.blockText}>{type}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Тривалість гри:</Text>
					<View style={styles.block}>
						{newDuration.map((duration) => {
							return (
								<Pressable key={duration} style={{ backgroundColor: selectedDuration === duration ? '#B66A53' : '#FAE2D4' }} onPress={() => pressDuration(duration)}>
									<View>
										<Text style={styles.blockText}>{duration} хв.</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Кількість учасників:</Text>
					<View style={styles.block}>
						{newCountPlayers.map((countPlayers) => {
							return (
								<Pressable key={countPlayers} style={{ backgroundColor: selectedCountPlayers === countPlayers ? '#B66A53' : '#FAE2D4' }} onPress={() => pressCountPlayers(countPlayers)}>
									<View>
										<Text style={styles.blockText}>{countPlayers}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Вік (років):</Text>
					<View style={styles.block}>
						{newAge.map((age) => {
							return (
								<Pressable key={age} style={{ backgroundColor: selectedAge === age ? '#B66A53' : '#FAE2D4' }} onPress={() => pressAge(age)}>
									<View>
										<Text style={styles.blockText}>{age}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Локація:</Text>
					<View style={styles.block}>
						{newLocation.map((location) => {
							return (
								<Pressable key={location} style={{ backgroundColor: selectedLocation === location ? '#B66A53' : '#FAE2D4' }} onPress={() => pressLocation(location)}>
									<View>
										<Text style={styles.blockText}>{location}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Фінанси (грн):</Text>
					<View style={styles.block}>
						{newMoney.map((money) => {
							return (
								<Pressable key={money} style={{ backgroundColor: selectedMoney === money ? '#B66A53' : '#FAE2D4' }} onPress={() => pressMoney(money)}>
									<View>
										<Text style={styles.blockText}>{money}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<View style={styles.buttonCenter}>
						<Pressable onPress={addGame} style={styles.button}>
							<Text style={styles.buttonText}>Save</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '54%',
	},
	inputAddGameBlock: {
		marginLeft: 12,
		marginRight: 12,
	},
	addGameText: {
		fontSize: 24,
	},
	input: {
		height: 40,
		marginTop: 5,
		marginBottom: 5,
		borderWidth: 1,
		padding: 10,
	},
	valueText: {

	},
	button: {
		alignItems: 'center',
		padding: 10,
		paddingLeft: 60,
		paddingRight: 60,
		borderRadius: 4,
		backgroundColor: '#FAE2D4',
		marginTop: 15,

	},
	buttonText: {
		color: 'black',
		fontSize: 24,
	},
	buttonCenter: {
		display: 'flex',
		alignItems: 'center',
	},
	buttonStyle: {
		height: 40,
		width: '100%',
		marginTop: 5,
		marginBottom: 5,
		borderWidth: 1,
		padding: 10,
		backgroundColor: '#FFFAF5',
	},
	buttonTextStyle: {
		color: 'black',
		fontSize: 14,
		textAlign: 'left',
		fontWeight: 600,
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
		// minWidth: '30%',
		textAlign: 'center',
		margin: 8,

	},
});

export default AddGame;