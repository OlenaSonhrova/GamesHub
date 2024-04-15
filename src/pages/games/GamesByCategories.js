import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { GetAllGames } from '../../api/api';
import Loader from '../../registration/components/loader';
import FlatListComponent from '../commons/flatList';


const GamesByCategories = ({ route }) => {

	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const type = route.params;

	const image = require('../../image/ice.png');

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const responsData = await GetAllGames(type);
			setData(responsData);
			setLoading(false);
		};

		fetchData();
	}, []);

	const onRefresh = useCallback(async () => {
		console.log('Refreshing...');
		setRefreshing(true);
		try {
			setLoading(true);
			const newData = await GetAllGames(type);
			console.log('New data:', newData);
			setData(newData);
			setLoading(false);
			setRefreshing(false);
		} catch (error) {
			console.error(error);
			setRefreshing(false);
		}
	}, []);


	return (
		<View style={styles.block}>
			{loading ? <Loader /> : <FlatListComponent data={data} refreshing={refreshing} onRefresh={onRefresh} image={image} />}
		</View>
	);
};

const styles = StyleSheet.create({
	block: {
		margin: 10,
	},
});

export default GamesByCategories;