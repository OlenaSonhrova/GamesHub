import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TextPrivacyPolice from '../registration/components/textPrivacyPolice';

const UserAgreement = () => {

	return (
		<ScrollView style={styles.container}>
			<TextPrivacyPolice />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginBottom: 30,
	},
});

export default UserAgreement;
