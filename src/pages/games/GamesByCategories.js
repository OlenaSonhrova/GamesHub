import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GetAllGames } from '../../api/api';
import Loader from '../../registration/components/loader';
import FlatListComponent from '../commons/flatList';
import { useFocusEffect, useRoute } from '@react-navigation/native';


const GamesByCategories = ({ navigation, offline, statusServer }) => {

	const route = useRoute();
	const type = route.params.type;
	const image = route.params.image;
	
	const [localData, setLocalData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await AsyncStorage.getItem(type);
			const games = JSON.parse(response);
			// console.log('type', type);
			// console.log('games', games);
			setLocalData(games);
		};
		fetchData();
	}, []);

	useEffect(() => {
		if (offline) {
		} else {
			refetch();
		}
	}, [offline]);

	const { data, isLoading, isError, isRefetching, refetch } = useQuery(
		{
			queryKey: ["GetAllGames"],
			queryFn: () => GetAllGames((navigation)),
			retry: 2,
		},
	);

	const handleRefresh = async () => {
		await refetch();
	};

	useFocusEffect(
		React.useCallback(() => {
			if (!offline) {
				refetch();
			};
		}, [refetch, offline])
	);


	if (isError) {
		statusServer(true);
		return (
			<View style={styles.backgroundColor}>
				<FlatListComponent data={localData} refreshing={isLoading} onRefresh={handleRefresh} image={image} />
			</View>
		);
	};

	return (
		<View style={styles.block}>
			{statusServer(false)}
			{(isLoading || isRefetching) ? <Loader /> : <FlatListComponent data={data?.new_games[type]} refreshing={isLoading} onRefresh={handleRefresh} image={image} />}
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		margin: 5,
	},
});

export default GamesByCategories;