import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

import { GetUserInfo } from '../api/api';

const UserProfileHeader = ({ navigation }) => {

	const [localData, setLocalData] = useState([]);

	const { data, isError } = useQuery(
		{
			queryKey: ["getUserInfo"],
			queryFn: () => GetUserInfo(navigation),
			retry: 0,
		},
	);

	useEffect(() => {
		AsyncStorage.getItem('userInfo').then((storedData) => {
			const parsedData = JSON.parse(storedData);
			if (parsedData && parsedData.length > 0) {
				setLocalData(parsedData);
			}
		});
	}, []);

	if (isError) {
		return (
			<View style={styles.container}>
				<View style={styles.logo}>
					<Image source={require('../image/online.png')}></Image>
				</View>
				<View style={styles.infa}>
					<Text style={styles.text} numberOfLines={1} ellipsizeMode="tail"> <Text style={{ fontSize: 18, fontWeight: '900'}}>User:</Text> {localData?.user?.username}</Text>
					<Text style={styles.text} numberOfLines={1} ellipsizeMode="tail"> <Text style={{ fontSize: 18, fontWeight: '900'}}>Email:</Text> {localData?.user?.email}</Text>
				</View>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.logo}>
				<Image source={require('../image/online.png')}></Image>
			</View>
			<View style={styles.infa}>
				<Text style={styles.text} numberOfLines={1} ellipsizeMode="tail"> <Text style={{ fontSize: 18, fontWeight: '900' }}>User:</Text> {data?.user?.username}</Text>
				<Text style={styles.text} numberOfLines={1} ellipsizeMode="tail"> <Text style={{ fontSize: 18, fontWeight: '900' }}>Email:</Text> {data?.user?.email}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
		marginTop: 30,
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	logo: {
		display: 'flex',
		width: 65,
		height: 65,
		borderRadius: 80,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	infa: {
		width: '66%',
	},
	text: {
		fontSize: 16,
		color: '#363535cb',
	},
});

export default UserProfileHeader;