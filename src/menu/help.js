import { Button, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const Help = ({navigation}) => {


	const onPtressUrl = (index) => {
		if (index === 1) {
			Linking.openURL('https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=esongrovaa@gmail.com&subject=MISSED%20CALL%20EZTRADER&body=Hello%2C%20I%20am%20writing%20about%20the%20application%20Games%20Hub...%0A%0A%0A%0A');
		} else if (index == 2) {
			Linking.openURL('http://t.me/Olena_Song');
		} else {
			Linking.openURL('https://www.instagram.com/olena_sonhrova?igsh=aXRxcmw4bjc5YThs');
		};
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.iconBlock}>
				<FontAwesomeIcon icon={faCircleQuestion} size={80} color='#8D6349' />
			</View>
			<View style={styles.textBlock}>
				<Text style={styles.text}>{'\t\t\t\t\t'}Якщо у вас виникли будь-які питання, пропозиції або потреба в допомозі, будь ласка, звертайтеся до нас.</Text>
				<Text style={styles.text}>{'\t\t\t\t\t'}Ми завжди готові відповісти на ваші запити і надати необхідну підтримку.</Text>
				<Text style={styles.textTitle}>Наші контакти:</Text>
			</View>
			<View style={styles.contacts}>
				<TouchableOpacity style={styles.contactsItem} onPress={() => onPtressUrl(1)}>
					<Image style={styles.contactsItemImage} source={require('../image/email.png')}></Image>
					<Text style={styles.textContacts}>esongrovaa@gmail.com</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.contactsItem} onPress={() => onPtressUrl(2)}>
					<Image style={styles.contactsItemImage} source={require('../image/telega.png')}></Image>
					<Text style={styles.textContacts}>+38 097 80 39 424</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.contactsItem} onPress={() => onPtressUrl(3)}>
					<Image style={styles.contactsItemImage} source={require('../image/insta.png')}></Image>
					<Text style={styles.textContacts}>@olena_sonhrova</Text>
				</TouchableOpacity>

			</View>
		</SafeAreaView>

	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	iconBlock: {
		display: 'flex',
		alignItems: 'center',
		padding: 10,
	},
	textTitle: {
		fontSize: 26,
		textAlign: 'justify',
		paddingVertical: 10,
		color: '#8D6349',
		fontWeight: '900',
	},
	text: {
		fontSize: 18,
		textAlign: 'justify',
		paddingBottom: 10,
		color: 'black',
	},
	contacts: {
		display: 'flex',
		gap: 10,

	},
	contactsItem: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
	},
	contactsItemImage: {
		height: 40,
		width: 40,
	},
	textContacts: {
		fontSize: 18,
		color: 'black',
	}
});

export default Help;
