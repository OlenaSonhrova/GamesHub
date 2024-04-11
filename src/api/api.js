import AsyncStorage from '@react-native-async-storage/async-storage';



const GetAllGames = async (type) => {
	// console.log('In function getAllGames token');
	const idUser = await AsyncStorage.getItem('user_id');
	const typeGame = type.type;
	const url = ('http://176.36.224.228:24242/api_v1/getAllGames?' + new URLSearchParams({ user_id: idUser, type: typeGame }));
	return fetch(url).then(response => response.json())
		.then(json => {
			// console.log(json);
			// console.log(jsonData?.games?.[typeGame]);
			return json?.games?.[typeGame];
		})
		.catch(error => {
			// console.error('Error again');
			console.error(error);
			alert('Opssss.', error);
		});
};

const GetUserSelectedGames = async () => {
	try {
		const idUser = await AsyncStorage.getItem('user_id');
		const url = ('http://176.36.224.228:24242/api_v1/getUserSelectedGames?' + new URLSearchParams({ user_id: idUser }));
		const response = await fetch(url);
		const json = await response.json();
		// console.log(json);
		return json?.games;
	} catch (error) {
		console.error(error);
		console.log(error.message);
		alert('Opssss.', error);
	}
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
			alert('Opssss.', error);
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
			alert('Opssss.', error);
		};
	}
};

const SetGameRating = async (rating, idGame) => {
	// console.log("Rating in function: ", rating);
	try {
		// console.log("Enter in try");
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
		alert('Opssss.', error);
	};
};

const LoginUser = async (userEmail, userPassword) => {
	// if(userEmail){
	// 	alert('In function');
	// 	return;
	// };
	console.log('In function');
	try {
		console.log('In function try');
		const url = "http://176.36.224.228:24242/api_v1/loginUser";
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: userEmail,
				password: userPassword,
			}),
		});
		const jsonData = await response.json();
		console.log(jsonData);
		return jsonData;
	} catch (error) {
		console.log('In function catch', error);
		// console.log(error);
		alert(`Не правильний Password або Email in API\n${error}`);
		// navigation.replace('LoginScreen');
	};
};



export { GetAllGames, GetUserSelectedGames, SelectedGame, SetGameRating, LoginUser};
