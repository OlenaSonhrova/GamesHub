import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const accessTokenRefresh = async () => {
	try {
		const refresh = await AsyncStorage.getItem('refresh');
		const url = "http://176.36.224.228:25252/api/v2/users/token/refresh/";
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				refresh: refresh,
			}),
		});
		const jsonData = await response.json();
		return jsonData?.access;
	} catch (error) {
		console.error('Error accessTokenRefresh data:', error);
		return error;
	};
};

const fetchData = async (nameUrl) => {
	const access = await AsyncStorage.getItem('access');
	const url = `http://176.36.224.228:25252/api/v2/core/${nameUrl}`;
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${access}`,
				'Content-Type': 'application/json'
			}
		});
		const result = await response.json();
		if (result?.code === 'token_not_valid') {
			const newAccess  = await accessTokenRefresh();
			await AsyncStorage.setItem('access', newAccess);
			return fetchData(nameUrl);
		}
		console.log('result in functon fetchData', result);
		return result;
	} catch (error) {
		console.error('Error fetching data:', error);
		return error;
	}
};

const LoginUser = async (userEmail, userPassword) => {
	try {
		const url = "http://176.36.224.228:25252/api/v2/users/login/";
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: userEmail,
				password: userPassword,
			}),
		});
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		alert(`Не правильний Password або Email in API\n${error}`);
		return error;
	};
};

const GetUserInfo = async () => {
	const access = await AsyncStorage.getItem('access');
	console.log(access);
	const url = "http://176.36.224.228:25252/api/v2/users/info/";
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${access}`,
				'Content-Type': 'application/json'
			}
		});
		const result = await response.json();
		if (result?.code === 'token_not_valid') {
			const newAccess  = await accessTokenRefresh();
			await AsyncStorage.setItem('access', newAccess);
			return GetUserInfo();
		}
		console.log('result in functon GetUserInfo', result);
		return result;
	} catch (error) {
		console.error('Error fetching data:', error);
		return error;
	}
};







const GetAllGames = async (type) => {
	// console.log('In function getAllGames token');
	const idUser = await AsyncStorage.getItem('user_id');
	const typeGame = type.type;
	const url = ('http://176.36.224.228:24242/api_v1/getAllGames?' + new URLSearchParams({ user_id: idUser, type: typeGame }));
	return fetch(url).then(response => response.json())
		.then(json => {
			return json?.games?.[typeGame];
		})
		.catch(error => {
			console.error(error);
			alert('Opssss.GetAllGames', error);
		});
};

const GetUserSelectedGames = async () => {
	try {
		const idUser = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getUserSelectedGames?' + new URLSearchParams({ user_id: idUser }));
		const response = await fetch(url);
		const json = await response.json();
		return json?.games;
	} catch (error) {
		console.error(error);
		console.log(error.message);
		alert('Opssss. GetUserSelectedGames', error);
	};
};

const GetUserCreatedGames = async () => {
	try {
		const id = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getUserCreatedGames?' + new URLSearchParams({ user_id: id }));
		const response = await fetch(url);
		const json = await response.json();
		// console.log(json);
		return json?.games;
	} catch (error) {
		console.error(error);
		console.log(error.message);
		alert('Opssss.GetUserCreatedGames', error);
	};
};

const SelectedGame = async (idGame, selected) => {
	if (selected) {
		try {
			const idUser = await AsyncStorage.getItem('user_id');
			const url = "http://176.36.224.228:24242/api_v1/removeSelectedGame";
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user_id: idUser,
					game_id: idGame,
				}),
			});
			const json = await response.json();
			console.log(json?.status)
		} catch (error) {
			console.log(error);
			alert('Opssss. SelectedGame', error);
		};
	} else {
		try {
			const idUser = await AsyncStorage.getItem('user_id');
			const url = "http://176.36.224.228:24242/api_v1/selectGame";
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					user_id: idUser,
					game_id: idGame,
				}),
			});
			const json = await response.json();
			console.log(json?.status)
		} catch (error) {
			console.log(error);
			alert('Opssss. SelectedGame', error);
		};
	}
};

const SetGameRating = async (rating, idGame) => {
	try {
		const idUser = await AsyncStorage.getItem('user_id');
		const url = "http://176.36.224.228:24242/api_v1/setGameRating";
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user_id: idUser,
				game_id: idGame,
				user_rating: rating,
			}),
		});
		const json = await response.json();
		// console.log(json);
	} catch (error) {
		console.error(error);
		alert('Opssss. SetGameRating', error);
	};
};

const RemoveSelectedGame = async (idGame) => {
	try {
		const url = "http://176.36.224.228:24242/api_v1/removeSelectedGame";
		const idUser = await AsyncStorage.getItem('user_id');
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: idUser,
				game_id: idGame,
			}),
		});
		const json = await response.json();
		return json;
		// console.log(json);
	} catch (error) {
		console.error(error);
		alert('Opssss.RemoveSelectedGame', error);
	}
};

const DeleteUserGame = async (idGame) => {
	try {
		const url = "http://176.36.224.228:24242/api_v1/deleteUserGame";
		const idUser = await AsyncStorage.getItem('user_id');
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_id: idUser,
				game_id: idGame,
			}),
		});
		const json = await response.json();
		return json;
		// console.log(json?.status)
	} catch (error) {
		console.error(error);
		alert('Opssss.RemoveSelectedGame', error);
	};
};

// const GetAllGameTypes = async () => {
// 	try {
// 		const id = await AsyncStorage.getItem('user_id');
// 		const url = ('http://176.36.224.228:24242/api_v1/getAllGameTypes?' + new URLSearchParams({ user_id: id }));
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		// console.log(data?.types);
// 		await AsyncStorage.setItem('gameTypes', JSON.stringify(data?.types));
// 		console.log('json.types api')
// 		return data?.types;
// 	} catch (error) {
// 		// alert('Opssss. Internet problems, check your connection. GetAllGameTypes', error.message);
// 		console.log('error in api')
// 		return error;
// 	}
// };

const GetAllGameLocations = async () => {
	try {
		const id = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getAllGameLocations?' + new URLSearchParams({ user_id: id }));
		const response = await fetch(url);
		const json = await response.json();
		// console.log(json);
		return json?.locations;
	} catch (error) {
		console.error(error);
		alert('Opssss.GetAllGameLocations', error);
	};
};

const GetAllPlayerAges = async () => {
	try {
		const id = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getAllPlayerAges?' + new URLSearchParams({ user_id: id }));
		const response = await fetch(url);
		const json = await response.json();
		// console.log(json.ages);
		return json?.ages;
	} catch (error) {
		console.error(error);
		alert('Opssss. GetAllPlayerAges', error);
	};
};

const GetAllMoneyRanges = async () => {
	try {
		const id = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getAllMoneyRanges?' + new URLSearchParams({ user_id: id }));
		const response = await fetch(url);
		const json = await response.json();
		// console.log(json);
		return json?.ranges;
	} catch (error) {
		console.error(error);
		alert('Opssss.GetAllMoneyRanges', error);
	};
};

const GetAllGameDurations = async () => {
	try {
		const id = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getAllGameDurations?' + new URLSearchParams({ user_id: id }));
		const response = await fetch(url);
		const json = await response.json();
		// console.log(json);
		return json?.durations;
	} catch (error) {
		console.error(error);
		alert('Opssss.GetAllGameDurations', error);
	};
};

const GetAllPlayerCounts = async () => {
	try {
		const id = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getAllPlayerCounts?' + new URLSearchParams({ user_id: id }));
		const response = await fetch(url);
		const json = await response.json();
		// console.log(json);
		return json?.counts;
	} catch (error) {
		console.error(error);
		alert('Opssss.GetAllPlayerCounts', error);
	};
};

const UpdateUserGame = async (name, selectedType, props, description, selectedDuration, selectedCountPlayers, selectedAge, selectedLocation, selectedMoney, gameIdForUpDAteInfa) => {
	try {
		const url = "http://176.36.224.228:24242/api_v1/updateUserGame";
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
		return dataToSend;
	} catch (error) {
		console.error(error);
		alert('Opssss. UpdateUserGame', error);
	};
};

const CreateUserGame = async (name, selectedType, props, description, selectedDuration, selectedCountPlayers, selectedAge, selectedLocation, selectedMoney, formattedDate) => {
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
		console.log(dataToSend);
		return dataToSend;
	} catch (error) {
		console.error(error);
		alert('Opssss. CreateUserGame', error);
	};
};

export {
	GetAllGames,
	GetUserSelectedGames,
	fetchData,
	SelectedGame,
	SetGameRating,
	LoginUser,
	GetUserInfo,
	GetUserCreatedGames,
	RemoveSelectedGame,
	DeleteUserGame,
	GetAllGameLocations,
	GetAllPlayerAges,
	GetAllMoneyRanges,
	GetAllGameDurations,
	GetAllPlayerCounts,
	UpdateUserGame,
	CreateUserGame
};
