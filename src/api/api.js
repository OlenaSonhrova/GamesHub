import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../consts/consts';


const basePost = async (url, body, navigation) => {
	// console.log(url);
	const access = await AsyncStorage.getItem('access');
	// console.log(access);
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${access}`,
				'Content-Type': 'application/json'
			},
			body: body
		});
		if (response?.status === 401) {
			const newAccess = await accessTokenRefresh(navigation);
			console.log(newAccess);
			if (!newAccess) {
				return { error: 'Failed to refresh access token' };
			};
			await AsyncStorage.setItem('access', newAccess);
			return basePost(url, body, navigation);
		};
		console.log('finish in basePost', url, response?.status);
		return response;
	} catch (error) {
		console.error('basePost', error);
		throw error;
	};
};

const baseGet = async (nameUrl, navigation) => {
	const access = await AsyncStorage.getItem('access');
	// console.log(access);
	const url = SERVER_URL + nameUrl;
	// console.log(url);
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${access}`,
				'Content-Type': 'application/json'
			}
		});
		const result = await response.json();
		if (result?.code === 'token_not_valid' || response?.status === 401) {
			const newAccess = await accessTokenRefresh(navigation);
			if (!newAccess) {
				return { error: 'Failed to refresh access token' };
			};
			await AsyncStorage.setItem('access', newAccess);
			return baseGet(nameUrl, navigation);
		};
		console.log('finish in baseGet', nameUrl, response?.status);
		return result;
	} catch (error) {
		console.error('Error baseGet data:', error);
		throw error;
	}
};

const accessTokenRefresh = async (navigation) => {
	const refresh = await AsyncStorage.getItem('refresh');
	const url = SERVER_URL + '/users/token/refresh/';
	const body = JSON.stringify({
		refresh: refresh,
	});
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		});
		const jsonData = await response.json();
		if (jsonData?.code === 'token_not_valid' || jsonData?.refresh === 'This field may not be null.' || response?.status === 401) {
			console.log('problem');
			await AsyncStorage.removeItem('access');
			await AsyncStorage.removeItem('refresh');
			navigation.replace('Auth');
			return;
		};
		return jsonData?.access;
	} catch (error) {
		console.error('Error accessTokenRefresh data:', error);
		return error;
	};
};

const LoginUser = async (userEmail, userPassword) => {
	const url = SERVER_URL + '/users/login/';
	const body = JSON.stringify({
		username: userEmail,
		password: userPassword,
	});
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		});;
		const jsonData = await response.json();
		return jsonData;
	} catch (error) {
		alert(`Не правильний Password або Email in API\n${error}`);
		throw error;
	};
};

const GetUserInfo = async (navigation) => {
	const nameUrl = '/users/info/';
	try {
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error('Error GetUserInfo data:', error);
		throw error;
	};
};

const logout = async () => {
	const url = SERVER_URL + '/users/logout/';
	const refresh = await AsyncStorage.getItem('refresh');
	const body = JSON.stringify({
		refresh: refresh,
	});
	try {
		const response = await basePost(url, body);
		return response?.status;
	} catch (error) {
		console.error('Error logout data:', error);
		throw error;
	};
};

const Register = async (userName, userEmail, userPassword) => {
	const url = SERVER_URL + '/users/register/';
	const body = JSON.stringify({
		username: userName,
		email: userEmail,
		password: userPassword,
	});
	try {
		const response = await basePost(url, body);
		return response?.status;
	} catch (error) {
		console.error('Error logout data:', error);
		throw error;
	};
};

const getAllGameTypes = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		await AsyncStorage.setItem('AllTypes', JSON.stringify(response));
		return response;
	} catch (error) {
		console.error('Error getAllGameTypes data:', error);
		throw error;
	};
};

const GetAllGames = async (navigation) => {
	const nameUrl = '/core/getAllGames/?';
	try {
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error('Error GetAllGames data:', error);
		throw error;
	};
};

const SelectedGame = async (idGame, navigation) => {
	const url = SERVER_URL + '/core/selectGame/';
	const body = JSON.stringify({
		name: idGame
	});
	try {
		const response = await basePost(url, body, navigation);
		return;
	} catch (error) {
		throw error;
	};
};

const RemoveSelectedGame = async (idGame, navigation) => {
	const url = SERVER_URL + '/core/removeSelectedGame/';
	const body = JSON.stringify({
		name: idGame,
	});
	try {
		const response = await basePost(url, body, navigation);
		return;
	} catch (error) {
		console.log('Opssss.RemoveSelectedGame');
		throw error;
	};
};

const SetGameRating = async (idGame, rating, navigation) => {
	const url = SERVER_URL + '/core/setGameRating/';
	const body = JSON.stringify({
		name: idGame,
		rating: rating,
	});
	try {
		const response = await basePost(url, body, navigation);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log('Opssss.RemoveSelectedGame');
		throw error;
	};
};

const SearchGames = async (body, navigation) => {
	const url = SERVER_URL + '/core/searchGames/';
	try {
		const response = await basePost(url, body, navigation);
		const data = await response.json();
		return data?.games;
	} catch (error) {
		console.log('Opssss.SearchGames');
		throw error;
	};
};





const GetAllGameLocations = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		// const id = await AsyncStorage.getItem('user_id');
		// const url = ('http://176.36.224.228:24242/api_v1/getAllGameLocations?' + new URLSearchParams({ user_id: id }));
		// const response = await fetch(url);
		// const json = await response.json();
		// console.log(json);
		// return json?.locations;
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllPlayerAges = async (nameUrl, navigation) => {
	try {
		// const id = await AsyncStorage.getItem('user_id');
		// const url = ('http://176.36.224.228:24242/api_v1/getAllPlayerAges?' + new URLSearchParams({ user_id: id }));
		// const response = await fetch(url);
		// const json = await response.json();
		// console.log(json.ages);
		// return json?.ages;
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllMoneyRanges = async (nameUrl, navigation) => {
	try {
		// const id = await AsyncStorage.getItem('user_id');
		// const url = ('http://176.36.224.228:24242/api_v1/getAllMoneyRanges?' + new URLSearchParams({ user_id: id }));
		// const response = await fetch(url);
		// const json = await response.json();
		// console.log(json);
		// return json?.ranges;
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllGameDurations = async (nameUrl, navigation) => {
	try {
		// const id = await AsyncStorage.getItem('user_id');
		// const url = ('http://176.36.224.228:24242/api_v1/getAllGameDurations?' + new URLSearchParams({ user_id: id }));
		// const response = await fetch(url);
		// const json = await response.json();
		// console.log(json);
		// return json?.durations;
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllPlayerCounts = async (nameUrl, navigation) => {
	try {
		// const id = await AsyncStorage.getItem('user_id');
		// const url = ('http://176.36.224.228:24242/api_v1/getAllPlayerCounts?' + new URLSearchParams({ user_id: id }));
		// const response = await fetch(url);
		// const json = await response.json();
		// console.log(json);
		// return json?.counts;
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
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

// const SetGameRating = async (rating, idGame) => {
// 	try {
// 		const idUser = await AsyncStorage.getItem('user_id');
// 		const url = "http://176.36.224.228:24242/api_v1/setGameRating";
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				Accept: 'application/json',
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				user_id: idUser,
// 				game_id: idGame,
// 				user_rating: rating,
// 			}),
// 		});
// 		const json = await response.json();
// 		// console.log(json);
// 	} catch (error) {
// 		console.error(error);
// 		alert('Opssss. SetGameRating', error);
// 	};
// };

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
	baseGet,
	logout,
	Register,
	getAllGameTypes,
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
	CreateUserGame,
	SearchGames
};
