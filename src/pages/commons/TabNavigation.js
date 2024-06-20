import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFolder, faSearch, faCirclePlus, faHeart } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { SearchStackNavigator, GamesStackNavigator, Liked, MyGames } from "./stackNavigation";
import OnlineOffline from "../../menu/OnlineOffline";
import { Pressable } from "react-native";
import { ChangeInternet } from "../../api/api";



const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation, statusServer, offline, isLoading, changeInternet }) => {

	const [isOffline, setIsOffline] = useState(offline);

	useEffect(() => {
		setIsOffline(offline);
	}, [offline]);

	return (
		<Tab.Navigator initialRouteName="HomeTab"
			screenOptions={{
				tabBarActiveTintColor: '#B66A53',
				headerShown: isOffline,
				// header: () => {
				// 	if (offline) {
				// 		return <OnlineOffline changeInternet={changeInternet} />;
				// 	} else {
				// 		return null;
				// 	}
				// },
			}}>
			<Tab.Screen name="GamesTab" options={{
				tabBarLabel: 'Games',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faFolder} color={color} />
				),
				header: () => (
					<OnlineOffline changeInternet={changeInternet} isLoading={isLoading}/>
				),
			}} >
				{() => <GamesStackNavigator offline={offline} statusServer={statusServer} />}
			</Tab.Screen>
			<Tab.Screen name="SearchTab" options={{
				tabBarLabel: 'Search',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faSearch} color={color} />
				),
				header: () => (
					<OnlineOffline changeInternet={changeInternet} isLoading={isLoading} />
				),
			}}>
				{() => <SearchStackNavigator offline={offline} statusServer={statusServer} />}
			</Tab.Screen>
			{/* <Tab.Screen name="SearchTab" options={{
				tabBarLabel: 'Search',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faSearch} color={color} />
				),
				header: () => (
					<OnlineOffline />
				),
			}} component={SearchStackNavigator} /> */}
			<Tab.Screen name="LikedTab" options={{
				tabBarLabel: 'Liked',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faHeart} color={color} />
				),
				header: () => (
					<OnlineOffline changeInternet={changeInternet} isLoading={isLoading} />
				),
			}}>
				{() => <Liked offline={offline} statusServer={statusServer} />}
			</Tab.Screen>
			<Tab.Screen name="MyGamesTab" options={{
				tabBarLabel: 'My Games',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faCirclePlus} color={color} />
				),
				header: () => (
					<OnlineOffline changeInternet={changeInternet}  />
				),
			}} >
				{() => <MyGames offline={offline} statusServer={statusServer} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;