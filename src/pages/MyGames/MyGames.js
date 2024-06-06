import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import AddGame from './addGames';
import Loader from '../../registration/components/loader';
import { GetUserCreatedGames } from '../../api/api';
import FlatListInMyGame from '../commons/flatListInMyGame';


const MyGamess = ({ navigation }) => {

	const imageLocal = require('../../image/myGame.png');
	const [addGameVisible, setAddGameVisible] = useState(false);
	const [newData, setNewData] = useState(data);
	const [newItem, setNewItem] = useState();
	const [upDate, setUpDate] = useState(false);

	const { data, isLoading, isError, refetch } = useQuery(
		{
			queryKey: ["GetUserCreatedGames"],
			queryFn: () => GetUserCreatedGames('/core/getUserCreatedGames/', navigation),
			retry: 2,
		},
	);
	
	useEffect(() => {
		setNewData(data);
	}, [data]);

	const handleRefresh = async () => {
		await refetch();
	};

	if (isError) {
		return <Text style={{ fontSize: 24, fontWeight: 700, textAlign: 'center', color: 'black', paddingBottom: 10, height: '100%'}} onPress={handleRefresh}>Перевірте з'днання з Інтернетом</Text>
	};


	const returnedDataAdd = async (newGame) => {
		setAddGameVisible(!addGameVisible);
		if (newGame) {
			setNewData([...newData, newGame]);
		};
	};

	const returnedDataUp = async (newGame, oldName) => {
		setAddGameVisible(!addGameVisible);
		setUpDate(!upDate);
		if (newGame) {
			const updatedGames = newData.filter((game) => game.name !== oldName);
			setNewData([...updatedGames, newGame]);
		};
	};


	const returnedClickUpDate = (item) => {
		setAddGameVisible(!addGameVisible);
		setUpDate(!upDate);
		setNewItem(item);
	};

	return (
		<SafeAreaView style={styles.backgroundColor}>
			<Pressable style={styles.addGameBlock} onPress={() => { setAddGameVisible(!addGameVisible) }}>
				<Text style={styles.addGameText}>Додати гру</Text>
				<FontAwesomeIcon icon={addGameVisible ? faCircleMinus : faCirclePlus} size={30} color='#8D6349' />
			</Pressable>
			{addGameVisible ? <AddGame returnedDataAdd={returnedDataAdd} returnedDataUp={returnedDataUp} item={newItem} upDate={upDate} /> : null}
			<View style={styles.center}>
				{isLoading ? <Loader /> : <FlatListInMyGame data={newData} refreshing={isLoading} onRefresh={handleRefresh} imageLocal={imageLocal} returnedClickUpDate={returnedClickUpDate} />}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	center: {
		margin: 10,
	},
	backgroundColor: {
		backgroundColor: '#FFFAF5',
		height: '100%',
	},
	addGameBlock: {
		display: 'flex',
		alignItems: 'center',
		gap: 10,
		paddingBottom: 10,
	},
});

export default MyGamess;
