import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFolder, faSearch, faCirclePlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { SearchStackNavigator, GamesStackNavigator, Liked, MyGames } from "./stackNavigation";



const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
	
	return (
		<Tab.Navigator initialRouteName="HomeTab"
			screenOptions={{
				tabBarActiveTintColor: '#B66A53',
				headerShown: false,
			}}>
			<Tab.Screen name="GamesTab" options={{
				tabBarLabel: 'Games',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faFolder} color={color} />
				),
			}} component={GamesStackNavigator} />
			<Tab.Screen name="SearchTab" options={{
				tabBarLabel: 'Search',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faSearch} color={color} />
				),
			}} component={SearchStackNavigator} />
			<Tab.Screen name="LikedTab" options={{
				tabBarLabel: 'Liked',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faHeart} color={color} />
				),
			}} component={Liked}
			/>
			<Tab.Screen name="MyGamesTab" options={{
				tabBarLabel: 'My Games',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faCirclePlus} color={color} />
				),
			}} component={MyGames}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;