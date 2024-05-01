import { useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../registration/components/loader';
import GetAllGamesLocal from '../../localData/localData';
import { fetchData } from '../../api/api';


const Games = ({ navigation }) => {

	const [localData, setLocalData] = useState([]);

	const { data, isLoading, isError, refetch } = useQuery(
		{
			queryKey: ["fetchData"],
			queryFn: () => fetchData('getAllGameTypes'),
			staleTime: 3600000,
			retry: 2,
		},
	);

	const handleRefresh = async () => {
		await refetch();
	};

	useEffect(() => {
		AsyncStorage.getItem('gameTypes').then((storedData) => {
			const parsedData = JSON.parse(storedData);
			if (parsedData && parsedData.length > 0) {
				setLocalData(parsedData);
			}
		});
	}, []);


	if (isLoading) {
		return <Loader />;
	};
	

	return (
		<View style={styles.backgroundColor}>
			<SafeAreaView style={styles.container}>
				<Text style={styles.titleBlock}>КАТЕГОРІЇ</Text>
				{/* <GetAllGamesLocal /> */}
				{isError ? (<View>
					<Text>Дані показані з кешу. Для відображення актуальної інформації перевірте з'днання з Інтернетом та перезавантажте сторінку</Text>
					<FlatList
						data={localData}
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
								});
							}}>
								<View style={styles.blockText}>
									<Text style={styles.number}>{item.count} Local</Text>
									<Text style={styles.text}>{item.name}</Text>
								</View>
								{/* <Image style={styles.image} key={index} source={item.src} /> */}
							</Pressable>
						)}
					/>
				</View>
				) : (<FlatList
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
							});
						}}>
							<View style={styles.blockText}>
								<Text style={styles.number}>{item.count} Server</Text>
								<Text style={styles.text}>{item.name}</Text>
							</View>
							{/* <Image style={styles.image} key={index} source={item.src} /> */}
						</Pressable>
					)}
				/>)}
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
