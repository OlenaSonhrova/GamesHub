import React, {useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GetAllGames } from '../../api/api';
import Loader from '../../registration/components/loader';
import FlatListComponent from '../commons/flatList';


const GamesByCategories = ({ route, navigation }) => {

	const [localData, setLocalData] = useState([]);
	const type = route.params.type;
	const image = route.params.image;

	useEffect(() => {
		const fetchData = async () => {
			const response = await AsyncStorage.getItem(type);
			const games = JSON.parse(response);
			setLocalData(games);
		};
		fetchData();
	}, []);

	const { data, isLoading, isError, refetch } = useQuery(
		{
			queryKey: ["GetAllGames"],
			queryFn: () => GetAllGames((navigation)),
			retry: 2,
		},
	);

	const handleRefresh = async () => {
		await refetch();
	};

	if (isError) {
		return (
			<View style={styles.backgroundColor}>
				<Text>Дані показані з кешу. Перевірте з'днання з Інтернетом</Text>
				<FlatListComponent data={localData} refreshing={isLoading} onRefresh={handleRefresh} image={image} />
			</View>
		);
	};

	return (
		<View style={styles.block}>
			{isLoading ? <Loader /> : <FlatListComponent data={data?.new_games[type]} refreshing={isLoading} onRefresh={handleRefresh} image={image} />}
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		margin: 5,
	},
});

export default GamesByCategories;