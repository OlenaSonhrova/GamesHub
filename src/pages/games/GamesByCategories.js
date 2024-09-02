import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GetAllGames } from '../../api/api';
import Loader from '../../registration/components/loader';
import FlatListComponent from '../commons/flatList';
import { useRoute } from '@react-navigation/native';


const GamesByCategories = ({ navigation, offline, statusServer }) => {



	const route = useRoute();
	const type = route.params.type;
	const image = route.params.image;



	const [localData, setLocalData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await AsyncStorage.getItem(type);
			const games = JSON.parse(response);
			setLocalData(games);
		};
		fetchData();
	}, []);


	const { data, isLoading, isError, isRefetching, refetch } = useQuery(
		{
			queryKey: ["GetAllGames"],
			queryFn: () => GetAllGames(type, navigation),
			retry: 0,
			enabled: !!type,
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


	if (isError || offline) {
		return (
			<View style={styles.block}>
				<FlatListComponent data={localData} onRefresh={handleRefresh} image={image} offline={offline} />
			</View>
		);
	};



	return (
		<View style={styles.block}>
			{(isLoading) ? <Loader /> : <FlatListComponent data={data?.new_games[type]} refreshing={isRefetching} onRefresh={handleRefresh} image={image} offline={offline} />}
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		margin: 5,
	},
});

export default GamesByCategories;