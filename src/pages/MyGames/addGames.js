import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { CreateUserGame, GetAllGameDurations, GetAllGameLocations, getAllGameTypes, GetAllMoneyRanges, GetAllPlayerAges, GetAllPlayerCounts, UpdateUserGame } from '../../api/api';
import Loader from '../../registration/components/loader';


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

	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		try {
			const type = await getAllGameTypes();
			const typeName = type.map(item => item.name);

			const location = await GetAllGameLocations();
			const age = await GetAllPlayerAges();
			const count = await GetAllPlayerCounts();
			const money = await GetAllMoneyRanges();
			const duration = await GetAllGameDurations();

			setNewType(typeName);
			setNewLocation(location);
			setNewAge(age);
			setNewCountPlayers(count);
			setNewMoney(money);
			setNewDuration(duration);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		};
	};

	useEffect(() => {
		getDataInfa();
	}, []);


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

		const dataToSend = "close window";
		onDataSubmit(dataToSend);

		if (upDate) {
			const upDateGame = await UpdateUserGame(name, selectedType, props, description, selectedDuration, selectedCountPlayers, selectedAge, selectedLocation, selectedMoney, gameIdForUpDAteInfa);
			onDataSubmit(upDateGame);

		} else {
			const createGame = await CreateUserGame(name, selectedType, props, description, selectedDuration, selectedCountPlayers, selectedAge, selectedLocation, selectedMoney, formattedDate);
			onDataSubmit(createGame);
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
						{newType.map((type, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedType === type ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedType(type) }}>
									<View>
										<Text style={styles.blockText}>{type}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Тривалість гри:</Text>
					<View style={styles.block}>
						{newDuration.map((duration, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedDuration === duration ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedDuration(duration) }}>
									<View>
										<Text style={styles.blockText}>{duration} хв.</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Кількість учасників:</Text>
					<View style={styles.block}>
						{newCountPlayers.map((countPlayers, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedCountPlayers === countPlayers ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedCountPlayers(countPlayers) }}>
									<View>
										<Text style={styles.blockText}>{countPlayers}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Вік (років):</Text>
					<View style={styles.block}>
						{newAge.map((age, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedAge === age ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedAge(age) }}>
									<View>
										<Text style={styles.blockText}>{age}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Локація:</Text>
					<View style={styles.block}>
						{newLocation.map((location, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedLocation === location ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedLocation(location) }}>
									<View>
										<Text style={styles.blockText}>{location}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={styles.valueText}>Фінанси (грн):</Text>
					<View style={styles.block}>
						{newMoney.map((money, index) => {
							return (
								<Pressable key={index} style={{ backgroundColor: selectedMoney === money ? '#B66A53' : '#FAE2D4' }} onPress={() => { setSelectedMoney(money) }}>
									<View>
										<Text style={styles.blockText}>{money}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<View style={styles.buttonCenter}>
						<Pressable onPress={addGame} style={styles.button}>
							<Text style={styles.buttonText}>Зберегти</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>}

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