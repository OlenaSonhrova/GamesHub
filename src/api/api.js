import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_URL } from '../consts/consts';


const basePost = async (url, body, navigation) => {
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
	const url = SERVER_URL + nameUrl;
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
		return response;
	} catch (error) {
		alert(`Opssss. Щось пішло не так`);
		throw error;
	};
};

const GetUserInfo = async (navigation) => {
	const nameUrl = '/users/info/';
	try {
		const response = await baseGet(nameUrl, navigation);
		await AsyncStorage.setItem('userInfo', JSON.stringify(response));
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
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		});
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
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: body
		});;
		return response;
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

const GetAllGames = async (type, navigation) => {
	const nameUrl = '/core/getAllGames/?'+ new URLSearchParams({ game_type: type, from_timestamp_ms: null });
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
		return response;
	} catch (error) {
		throw error;
	};
};

const PlayedGame = async (idGame, navigation) => {
	const url = SERVER_URL + '/core/setUserPlayedGame/';
	const body = JSON.stringify({
		name: idGame
	});
	try {
		const response = await basePost(url, body, navigation);
		return response;
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
		return response;
	} catch (error) {
		console.log('Opssss.RemoveSelectedGame');
		throw error;
	};
};

const RemoveUserPlayedGame = async (idGame, navigation) => {
	const url = SERVER_URL + '/core/removeUserPlayedGame/';
	const body = JSON.stringify({
		name: idGame,
	});
	try {
		const response = await basePost(url, body, navigation);
		return response;
	} catch (error) {
		console.log('Opssss.RemoveUserPlayedGame');
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
		return response;
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
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllPlayerAges = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllMoneyRanges = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllGameDurations = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetAllPlayerCounts = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		return response;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetUserSelectedGames = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		return response?.games;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetUserPlayedGames = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		return response?.games;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const GetUserCreatedGames = async (nameUrl, navigation) => {
	try {
		const response = await baseGet(nameUrl, navigation);
		return response?.games;
	} catch (error) {
		console.error(error);
		throw error;
	};
};

const DeleteUserGame = async (nameUrl, idGame, navigation) => {
	const url = SERVER_URL + nameUrl;
	const body = JSON.stringify({
		name: idGame,
	});
	try {
		const response = await basePost(url, body, navigation);
		return response;
	} catch (error) {
		console.log('Opssss.DeleteUserGame');
		throw error;
	};
};

const CreateUserGame = async (nameUrl, body, navigation) => {
	const url = SERVER_URL + nameUrl;
	try {
		const response = await basePost(url, body, navigation);
		return response;
	} catch (error) {
		console.log('Opssss.DeleteUserGame');
		throw error;
	};
};

const UpdateUserGame = async (nameUrl, body, navigation) => {
	const url = SERVER_URL + nameUrl;
	try {
		const response = await basePost(url, body, navigation);
		return response;
	} catch (error) {
		console.log('Opssss.UpdateUserGame');
		throw error;
	};
};

const ChangeInternet = async () => {
	const nameUrl = '/users/info/';
	const url = SERVER_URL + nameUrl;
	const access = await AsyncStorage.getItem('access');
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${access}`,
				'Content-Type': 'application/json'
			},
			timeout: 5000
		});
		console.log('finish in ChangeInternet', nameUrl, response?.status);
		return response?.status ;
	} catch (error) {
		console.error('Error baseGet data:', error);
		throw error;
	}
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
	SearchGames,
	ChangeInternet,
	GetUserPlayedGames,
	RemoveUserPlayedGame,
	PlayedGame
};
