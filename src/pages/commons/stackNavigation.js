import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import Games from "../games/games";
import Search from "../search/search";
import Likedd from "../Liked/Liked";
import MyGamess from "../MyGames/MyGames";

import GamesByCategories from "../games/GamesByCategories";


const Stack = createStackNavigator();

const screenOptionStyle = {
	headerStyle: {
		backgroundColor: "#B66A53",
	},
	headerShown: false,
	headerTintColor: "white",
	headerBackTitle: "Back",
};

const GamesStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="GamesStack" component={Games} />
			<Stack.Screen name="Ігри" component={GamesByCategories} options={{ headerShown: true }} />
		</Stack.Navigator>
	);
}

const SearchStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="SearchStack" component={Search} />
		</Stack.Navigator>
	);
}

const Liked = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="LikedStack" component={Likedd} />
		</Stack.Navigator>
	);
}

const MyGames = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="MyGamesStack" component={MyGamess} />
		</Stack.Navigator>
	);
}


export { GamesStackNavigator, SearchStackNavigator, Liked, MyGames };