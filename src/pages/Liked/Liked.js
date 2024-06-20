import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import Loader from '../../registration/components/loader';
import { GetUserSelectedGames } from '../../api/api';
import FlatListComponent from '../commons/flatList';
import { useFocusEffect } from '@react-navigation/native';




const Likedd = ({ navigation, offline, statusServer }) => {

	const imageLocal = require('../../image/like.png');

	const [localData, setLocalData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await AsyncStorage.getItem('SelectedGames');
			const games = JSON.parse(response);
			setLocalData(games);
		};
		fetchData();
	}, []);


	const { data, isLoading, isError, isRefetching, refetch } = useQuery(
		{
			queryKey: ["GetUserSelectedGames"],
			queryFn: () => GetUserSelectedGames('/core/getUserSelectedGames/', navigation),
			retry: 2,
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
				<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Обрані ігри</Text>
				<FlatListComponent data={localData} onRefresh={handleRefresh} imageLocal={imageLocal} offline={offline}/>
			</View>
		);
	};


	return (
		<SafeAreaView style={styles.center}>
			<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Обрані ігри</Text>
			{(isLoading) ? <Loader /> : <FlatListComponent data={data} refreshing={isRefetching} onRefresh={handleRefresh} imageLocal={imageLocal} offline={offline}/>}
			{/* {(isLoading || isRefetching) ? <Loader /> : <FlatListComponent data={data} refreshing={isLoading} onRefresh={handleRefresh} imageLocal={imageLocal} />} */}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	center: {
		height: '100%',
		margin: 10,
	},
});


export default Likedd;
