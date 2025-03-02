import { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Image, RefreshControl } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../registration/components/loader';
import LocalStorage from '../../Localstorege/LocalStorege';

import { getAllGameTypes } from '../../api/api';



const Games = ({ offline, statusServer }) => {

	const navigation = useNavigation();

	const [localData, setLocalData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await AsyncStorage.getItem('AllTypes');
			const allGameTypes = JSON.parse(response);
			setLocalData(allGameTypes);
		};
		fetchData();
	}, []);


	const { data, isLoading, isError, refetch } = useQuery(
		{
			queryKey: ["getAllGameTypes"],
			queryFn: () => getAllGameTypes('/core/getAllGameTypes/', navigation),
			retry: 0,
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
		await refetch();
	};

	if (isLoading) {
		return <Loader />;
	};

	if (isError || offline) {
		return (
			<View style={styles.backgroundColor}>
				<SafeAreaView style={styles.container}>
					<Text style={styles.titleBlock}>КАТЕГОРІЇ</Text>
					<FlatList
						data={localData?.types}
						refreshControl={
							<RefreshControl
								refreshing={isLoading}
								onRefresh={handleRefresh}
							/>
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
									image: item.icon,
								});
							}}>
								<View style={styles.blockText}>
									<Text style={styles.number}>{item.count}</Text>
									<Text style={styles.text}>{item.name}</Text>
								</View>
								<Image style={styles.image} key={index} source={{ uri: item.icon }} />
							</Pressable>
						)}
					/>
				</SafeAreaView>
			</View>
		);
	};


	return (
		<View style={styles.backgroundColor}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.titleBlock}>КАТЕГОРІЇ</Text>
				<FlatList
					data={data?.types}
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={handleRefresh}
						/>
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
								image: item.icon,
							});
						}}>
							<View style={styles.blockText}>
								<Text style={styles.number}>{item.count}</Text>
								<Text style={styles.text}>{item.name}</Text>
							</View>
							<Image style={styles.image} key={index} source={{ uri: item.icon }} />
						</Pressable>
					)}
				/>
				<LocalStorage />
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
		borderRadius: 7,
		marginBottom: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		paddingVertical: 12,

	},
	blockText: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '70%',
	},
	number: {
		fontSize: 20,
		fontWeight: '600',
		color: 'black',
		margin: 10,
	},
	text: {
		fontSize: 24,
		fontWeight: '600',
		color: 'black',
	},
	image: {
		height: 35,
		width: 35,
		margin: 4,
		marginRight: 10,
	},
});

export default Games;
