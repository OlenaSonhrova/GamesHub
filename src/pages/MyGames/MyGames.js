import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { Pressable, SafeAreaView, StyleSheet, Text, View, BackHandler } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

import AddGame from './addGames';
import Loader from '../../registration/components/loader';
import { GetUserCreatedGames } from '../../api/api';
import FlatListInMyGame from '../commons/flatListInMyGame';
import { useFocusEffect } from '@react-navigation/native';


const MyGamess = ({ navigation, offline, statusServer }) => {

	const imageLocal = require('../../image/myGame.png');
	const [addGameVisible, setAddGameVisible] = useState(false);
	const [newData, setNewData] = useState(data);
	const [newItem, setNewItem] = useState();
	const [upDate, setUpDate] = useState(false);
	const [localData, setLocalData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await AsyncStorage.getItem('CreatedGames');
			const games = JSON.parse(response);
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

	useFocusEffect(
		React.useCallback(() => {
			if (!offline) {
				refetch();
			};
		}, [refetch, offline])
	);

	useEffect(() => {
		if (!addGameVisible) {
			refetch();
		}
	}, [addGameVisible, refetch]);

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

	useEffect(() => {
		const backHandler = () => {
			if (addGameVisible) {
				setAddGameVisible(false);
				console.log('умови дві +');
				return true;
			}
			return false;
		};
		BackHandler.addEventListener('hardwareBackPress', backHandler);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', backHandler);
		};
	}, [addGameVisible]);

	if (isError) {
		statusServer(true);
		return (
			<SafeAreaView style={[styles.backgroundColor, styles.center]}>
				<FlatListInMyGame data={localData} refreshing={isLoading} onRefresh={handleRefresh} imageLocal={imageLocal} />
			</SafeAreaView>
		);
	};


	return (
		<SafeAreaView style={styles.backgroundColor}>
			{statusServer(false)}
			<Pressable style={styles.addGameBlock} onPress={() => { setAddGameVisible(!addGameVisible) }}>
				<Text style={styles.addGameText}>Додати гру</Text>
				<FontAwesomeIcon icon={addGameVisible ? faCircleMinus : faCirclePlus} size={30} color='#8D6349' />
			</Pressable>
			{addGameVisible ? <AddGame returnedDataAdd={returnedDataAdd} returnedDataUp={returnedDataUp} item={newItem} upDate={upDate} /> : null}
			<View style={styles.center}>
				{(isLoading || isRefetching) ? <Loader /> : <FlatListInMyGame data={newData} refreshing={isLoading} onRefresh={handleRefresh} imageLocal={imageLocal} returnedClickUpDate={returnedClickUpDate} />}
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
