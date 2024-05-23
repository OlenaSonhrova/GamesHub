import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';

import { GetUserInfo } from '../api/api';

const UserProfileHeader = ({navigation}) => {

	const [localData, setLocalData] = useState([]);

	const { data } = useQuery(
		{
			queryKey: ["getUserInfo"],
			queryFn: () => GetUserInfo(navigation),
			retry: 2,
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

	// console.log(data);

	return (
		<View style={styles.container}>
			<View style={styles.logo}>
				<Text style={{ fontSize: 40, color: '#307ecc' }}>
					{data?.user?.username.charAt(0) || 'U E'}
				</Text>
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
	},
	logo: {
		display: 'flex',
		width: '30%',
		height: '100%',
		borderRadius: 50,
		backgroundColor: '#ffffff',
		alignItems: 'center',
	},
	infa: {
		width: '66%',
		height: '100%',
	},
	text: {
		fontSize: 16,
	},
});

export default UserProfileHeader;