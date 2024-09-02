import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFolder, faSearch, faCirclePlus, faHeart, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { SearchStackNavigator, GamesStackNavigator, Liked, MyGames, Played } from "./stackNavigation";
import OnlineOffline from "../../menu/OnlineOffline";



const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ statusServer, offline, isLoading, changeInternet }) => {

	const [isOffline, setIsOffline] = useState(offline);

	useEffect(() => {
		setIsOffline(offline);
	}, [offline]);

	return (
		<Tab.Navigator initialRouteName="HomeTab"
			screenOptions={{
				tabBarActiveTintColor: '#B66A53',
				headerShown: isOffline,
			}}>
			<Tab.Screen name="GamesTab" options={{
				tabBarLabel: 'Games',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faFolder} color={color} />
				),
				header: () => (
					<OnlineOffline changeInternet={changeInternet} isLoading={isLoading} />
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

			<Tab.Screen name="PlayedTab" options={{
				tabBarLabel: 'Played',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faSquareCheck} color={color} />
				),
				header: () => (
					<OnlineOffline changeInternet={changeInternet} isLoading={isLoading} />
				),
			}}>
				{() => <Played offline={offline} statusServer={statusServer} />}
			</Tab.Screen>

			<Tab.Screen name="MyGamesTab" options={{
				tabBarLabel: 'My Games',
				tabBarIcon: ({ color }) => (
					<FontAwesomeIcon icon={faCirclePlus} color={color} />
				),
				header: () => (
					<OnlineOffline changeInternet={changeInternet} />
				),
			}} >
				{() => <MyGames offline={offline} statusServer={statusServer} />}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;