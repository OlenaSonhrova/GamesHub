import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../registration/components/loader';


const Games = ({ navigation }) => {

	const data = [
		{
			name: "Перевірка",
			count: 10,
			src: require('../../image/ice.png'),
		}
	];

	const [newData, setNewData] = useState(data);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(false);

	const addMissingProperty = (obj) => ({
		...obj,
		name: obj.name || "Default Type",
		count: obj.count || 0,
		src: obj.src || require('../../image/ice.png'),
	});

	const getAllTypes = async () => {
		setLoading(true);
		try {
			const id = await AsyncStorage.getItem('user_id');
			const url = ('http://176.36.224.228:24242/api_v1/getAllGameTypes?' + new URLSearchParams({ user_id: id }));
			// console.log(url);
			const response = await fetch(url);
			const json = await response.json();
			const allType = json?.types
			// console.log(allType);
			const newDataServer = allType.map((obj) => addMissingProperty(obj));
			const updatedData = [...newDataServer];
			setNewData(updatedData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
			alert('Opssss.', error);
		}
	};

	useEffect(() => {
		getAllTypes();
	}, []);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		try {
			setLoading(true);
			await getAllTypes();
			setLoading(false);
			setRefreshing(false);
		} catch (error) {
			console.error(error);
			setRefreshing(false);
		}
	}, []);

	return (
		<View style={styles.backgroundColor}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.titleBlock}>КАТЕГОРІЇ</Text>
				{loading ? <Loader /> : <FlatList
					data={newData}
					extraData={refreshing}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh} />
					}
					renderItem={({ item, index }) => (
						<Pressable style={({ pressed }) => [
							{
								backgroundColor: pressed ? '#FAE2D4' : '#EEC9B0',
							},
							styles.block,
						]} onPress={() => {
							navigation.navigate('Ігри', {
								type: item.name,
							});
						}}>
							<View style={styles.blockText}>
								<Text style={styles.number}>{item.count}</Text>
								<Text style={styles.text}>{item.name}</Text>
							</View>
							<Image style={styles.image} key={index} source={item.src} />
						</Pressable>
					)}
				/>}
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundColor: {
		backgroundColor: '#FFFAF5',
		height: '100%',
		padding: 10,
	},
	container: {
		height: '100%',
	},
	titleBlock: {
		fontSize: 26,
		textAlign: 'center',
		fontWeight: '900',
	},
	block: {
		display: 'flex',
		flexDirection: 'row',
		borderRadius: 30,
		marginBottom: 10,
		padding: 5,
		paddingLeft: 15,
		paddingRight: 15,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	blockText: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '80%',
	},
	number: {
		fontSize: 26,
		fontWeight: '600',
		color: 'black',
	},
	text: {
		fontSize: 24,
		fontWeight: '600',
		color: 'black',
	},
	image: {
	},
});

export default Games;
