import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import Loader from '../../registration/components/loader';
import { GetUserSelectedGames } from '../../api/api';
import FlatListComponent from '../commons/flatList';
import { useFocusEffect } from '@react-navigation/native';




const Likedd = ({ navigation }) => {

	const imageLocal = require('../../image/like.png');


	const { data, isLoading, isError, refetch } = useQuery(
		{
			queryKey: ["GetUserSelectedGames"],
			queryFn: () => GetUserSelectedGames('/core/getUserSelectedGames/', navigation),
			retry: 2,
		},
	);

	const handleRefresh = async () => {
		await refetch();
	};

	useFocusEffect(
		React.useCallback(() => {
			refetch();
		}, [refetch])
	);

	if (isError) {
		return <Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Перевірте з'днання з Інтернетом</Text>
	};

	return (
		<SafeAreaView style={styles.center}>
			<Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10 }}>Обрані ігри</Text>
			{isLoading ? <Loader /> : <FlatListComponent data={data} refreshing={isLoading} onRefresh={handleRefresh} imageLocal={imageLocal} />}
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
