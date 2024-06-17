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


const GamesStackNavigator = ({ offline, statusServer }) => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			{/* <Stack.Screen name="GamesStack" component={Games} /> */}
			<Stack.Screen name="GamesStack">
				{() => <Games offline={offline} statusServer={statusServer}/>}
			</Stack.Screen>
			{/* <Stack.Screen name="Ігри" component={GamesByCategories} options={{ headerShown: true }} /> */}
			<Stack.Screen name="Ігри" options={{ headerShown: true }}>
				{() => <GamesByCategories offline={offline} statusServer={statusServer}/>}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

const SearchStackNavigator = ({ offline, statusServer }) => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="SearchStack">
				{() => <Search offline={offline} statusServer={statusServer} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

// const SearchStackNavigator = () => {
// 	return (
// 		<Stack.Navigator screenOptions={screenOptionStyle}>
// 			<Stack.Screen name="SearchStack" component={Search} />
// 		</Stack.Navigator>
// 	);
// }

const Liked = ({ offline, statusServer }) => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="LikedStack">
				{() => <Likedd offline={offline} statusServer={statusServer} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

const MyGames = ({ offline, statusServer }) => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="MyGamesStack">
				{() => <MyGamess offline={offline} statusServer={statusServer} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}


export { GamesStackNavigator, SearchStackNavigator, Liked, MyGames };