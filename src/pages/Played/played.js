import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import Loader from '../../registration/components/loader';
import { GetUserPlayedGames, GetUserSelectedGames } from '../../api/api';
import FlatListComponent from '../commons/flatList';
import { useFocusEffect } from '@react-navigation/native';




const PlayedGames = ({ navigation, offline, statusServer }) => {

	const imageLocal = require('../../image/played.png');
	const listGamesPlayed = true;

	

	const [localData, setLocalData] = useState([]);


	// в локальному зробити щоб три списки частіше оновлювались

	useEffect(() => {
		const fetchData = async () => {
			const response = await AsyncStorage.getItem('PlayedGames');
			const games = JSON.parse(response);
			setLocalData(games);
		};
		fetchData();
	}, []);


	const { data, isLoading, isError, isRefetching, refetch } = useQuery(
		{
			queryKey: ["GetUserPlayedGames"],
			queryFn: () => GetUserPlayedGames('/core/getUserPlayedGames/', navigation),
			retry: 1,
		},
	);

	useEffect(() => {
		if (offline) {
		} else {
			refetch();
		}
	}, [offline]);

	useEffect(() => {
		if (isError) {
			statusServer(true);
		}
	}, [isError]);


	const handleRefresh = async () => {
		if (offline) {
		} else {
			await refetch();
		};
	};

	useFocusEffect(
		React.useCallback(() => {
			if (!offline) {
				refetch();
			};
		}, [refetch, offline])
	);

	if (isError || offline) {
		return (
			<View style={[styles.backgroundColor, styles.center]}>
				<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Зіграні ігри</Text>
				<FlatListComponent data={localData} onRefresh={handleRefresh} imageLocal={imageLocal} offline={offline}/>
			</View>
		);
	};


	return (
		<SafeAreaView style={styles.center}>
			<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Зіграні ігри</Text>
			{(isLoading) ? <Loader /> : <FlatListComponent data={data} refreshing={isRefetching} onRefresh={handleRefresh} imageLocal={imageLocal} offline={offline} listGamesPlayed={listGamesPlayed}/>}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	center: {
		height: '100%',
		margin: 10,
	},
});


export default PlayedGames;
