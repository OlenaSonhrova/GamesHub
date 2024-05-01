import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleQuestion, faArrowLeft, faHandshakeSimple, faCircleInfo, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import BottomTabNavigator from "../pages/commons/TabNavigation";
import Help from "./help";
import AboutApplication from "./aboutApplication";
import UserAgreement from "./userAgreement";
import { GetUserInfo } from "../api/api";


const CustomSidebarMenu = (props) => {

	const [dataHuk, setDataHuk] = useState();

	useEffect(() => {
		const fetchLocalData = async () => {
			const data = await GetUserInfo();
			const storedData = await AsyncStorage.getItem('userInfo');
			if (storedData) {
				setDataHuk(JSON.parse(storedData));
			};
			if (data) {
				setDataHuk(data?.user);
			};
		};
		fetchLocalData();
	}, []);



	return (
		<View style={stylesSidebar.sideMenuContainer}>
			<View style={stylesSidebar.profileHeader}>
				<View style={stylesSidebar.profileHeaderPicCircle}>
					<Text style={{ fontSize: 40, color: '#307ecc' }}>
						{dataHuk?.username.charAt(0) || 'Uss'}
					</Text>
				</View>
				<View style={stylesSidebar.profileHeaderTextContainer}>
					<Text style={stylesSidebar.profileHeaderText}>
						<Text style={stylesSidebar.profileHeaderTextTitle}>User:  </Text>{dataHuk?.username}
					</Text>
					<Text style={stylesSidebar.profileHeaderText}>
					<Text style={stylesSidebar.profileHeaderTextTitle}>Email:  </Text>{dataHuk?.email}
					</Text>
				</View>
			</View>
			<View style={stylesSidebar.profileHeaderLine} />
			<DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
				<DrawerItem
					label={({ color }) =>
						<Text style={{ color: 'black', fontSize: 14 }}><FontAwesomeIcon icon={faArrowRightFromBracket} size={25} color='#8D6349' />          Logout</Text>
					}
					onPress={() => {
						props.navigation.toggleDrawer();
						Alert.alert(
							'Logout',
							'Are you sure? You want to logout?',
							[
								{
									text: 'Cancel',
									onPress: () => {
										return null;
									},
								},
								{
									text: 'Confirm',
									onPress: () => {
										AsyncStorage.clear();
										props.navigation.replace('Auth');
									},
								},
							],
							{ cancelable: false },
						);
					}}
				/>
			</DrawerContentScrollView>
		</View>
	);
};

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {

	return (
		<Drawer.Navigator
			screenOptions={{
				drawerType: 'back',
			}} drawerContent={props => <CustomSidebarMenu {...props} />}
		>
			<Drawer.Screen name="Menu" component={BottomTabNavigator}
				options={{
					title: 'Меню',
					headerStyle: {
						backgroundColor: '#EEC9B0'
						// backgroundColor: 'red'
					},
					drawerIcon: () => <FontAwesomeIcon icon={faArrowLeft} size={25} color='#8D6349' />,
				}}
			/>
			<Drawer.Screen name="Help" component={Help}
				options={{
					title: 'Допомога',
					headerStyle: {
						backgroundColor: '#EEC9B0',
					},
					drawerIcon: () => <FontAwesomeIcon icon={faCircleQuestion} size={25} color='#8D6349' />
				}}
			/>
			<Drawer.Screen name="UserAgreement" component={UserAgreement}
				options={{
					title: 'Угода користувача',
					headerStyle: {
						backgroundColor: '#EEC9B0'
					},
					drawerIcon: () => <FontAwesomeIcon icon={faHandshakeSimple} size={25} color='#8D6349' />
				}}
			/>
			<Drawer.Screen name="AboutApplication" component={AboutApplication}
				options={{
					title: 'Про застосунок',
					headerStyle: {
						backgroundColor: '#EEC9B0'
					},
					drawerIcon: () => <FontAwesomeIcon icon={faCircleInfo} size={25} color='#8D6349' />
				}}
			/>
		</Drawer.Navigator >
	);
}

export default DrawerNavigator;

const stylesSidebar = StyleSheet.create({
	sideMenuContainer: {
		width: '100%',
		height: '100%',
		backgroundColor: '#FAE2D4',
		paddingTop: 40,
		color: 'white',
	},
	profileHeader: {
		flexDirection: 'row',
		backgroundColor: '#FAE2D4',
		padding: 10,
		textAlign: 'center',
	},
	profileHeaderPicCircle: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2,
		color: 'white',
		backgroundColor: '#ffffff',
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileHeaderTextContainer: {
		display: 'flex',
		flexDirection: 'column',

	},
	profileHeaderText: {
		color: 'black',
		fontSize: 16,
		paddingHorizontal: 10,
		maxWidth: 190,
	},
	profileHeaderLine: {
		height: 1,
		marginHorizontal: 20,
		backgroundColor: 'black',
		marginTop: 15,
	},
	profileHeaderTextTitle: {
		fontWeight: '900',
	},
});