import { SafeAreaView, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleQuestion, faArrowLeft, faHandshakeSimple, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import BottomTabNavigator from "../pages/commons/TabNavigation";
import Help from "./help";
import AboutApplication from "./aboutApplication";
import UserAgreement from "./userAgreement";
import UserProfileHeader from "./UserProfileHeader";
import LogoutButton from "./LogoutButton";
import { useState } from "react";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

	const [offline, setOffline] = useState(true);

	const statusServer = (statusNow) => {
		// console.log('statusServer', statusNow);
		setOffline(statusNow);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Drawer.Navigator
				screenOptions={{
					drawerStyle: {
						backgroundColor: '#EEC9B0',
					},
				}}
				drawerType='slide'
				drawerContent={(props) => (
					<>
						<UserProfileHeader />
						<DrawerContentScrollView {...props}>
							<DrawerItemList {...props} />
							<LogoutButton navigation={props.navigation} />
						</DrawerContentScrollView>
					</>
				)}
			>
				<Drawer.Screen name="Menu" options={{
					title: 'Menu',
					headerStyle: {
						backgroundColor: '#EEC9B0',
					},
					drawerLabelStyle: { color: 'black', fontWeight: '400' },
					drawerIcon: () => <FontAwesomeIcon icon={faArrowLeft} size={25} color='#8D6349' />,
				}}>
					{() => <BottomTabNavigator offline={offline} statusServer={statusServer}/>}
				</Drawer.Screen>
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
		</SafeAreaView>

	);
}

export default DrawerNavigator;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});