import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import DrawerNavigator from './src/menu/drawerNavigator';
import LoginScreen from './src/registration/LoginScreen';
import RegisterScreen from './src/registration/RegisterScreen';
import SplashScreen from './src/registration/SplashScreen';
import PrivacyPolicy from './src/registration/PrivacyPolicy';


const queryClient = new QueryClient();
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
					title: 'Register',
					headerStyle: {
						backgroundColor: '#DDA394',
					},
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
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
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="SplashScreen">
					<Stack.Screen
						name="SplashScreen"
						component={SplashScreen}
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
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</QueryClientProvider>
	);
}

export default App;
