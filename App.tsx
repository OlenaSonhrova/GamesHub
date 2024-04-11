import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './src/menu/drawerNavigator';
import LoginScreen from './src/registration/LoginScreen';
import RegisterScreen from './src/registration/RegisterScreen';
import SplashScreen from './src/registration/SplashScreen';
import PrivacyPolicy from './src/registration/PrivacyPolicy';


const Stack = createStackNavigator();

const Auth = () => {
	return (
		<Stack.Navigator initialRouteName="LoginScreen">
			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="RegisterScreen"
				component={RegisterScreen}
				options={{
					title: 'Register', //Set Header Title
					headerStyle: {
						backgroundColor: '#DDA394', //Set Header color
					},
					headerTintColor: '#fff', //Set Header text color
					headerTitleStyle: {
						fontWeight: 'bold', //Set Header text style
					},
				}}
			/>
			<Stack.Screen
				name="PrivacyPolicy"
				component={PrivacyPolicy}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};


function App() {
	return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="SplashScreen">
						<Stack.Screen
							name="SplashScreen"
							component={SplashScreen}
							// Hiding header for Splash Screen
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Auth"
							component={Auth}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="DrawerNavigator"
							component={DrawerNavigator}
							// Hiding header for Navigation Drawer
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
					{/* <DrawerNavigator /> */}
				</NavigationContainer>

	);
}

export default App;
