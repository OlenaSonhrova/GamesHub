import React from 'react';
import { Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const AboutApplication = () => {

	return (
		<View>
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={styles.iconBlock}>
						<FontAwesomeIcon icon={faCircleInfo} size={80} color='#8D6349' />
					</View>
					<View style={styles.textBlock}>
						<Text style={styles.text}>{'\t\t\t\t\t'}Ласкаво просимо до нашого мобільного додатку <Text style={styles.gamesHub}>"Games Hub"</Text> - ваш компаньйон для незабутніх ігор та розваг у будь-якому місці та часі! Незалежно від того, чи ви на природі, чи в приміщенні, з нашим додатком ви знайдете безліч захопливих ігор для всіх вікових категорій та типів подій.</Text>
						<Text style={styles.text}>{'\t\t\t\t\t'}Чи це діти, молодь або дорослі, <Text style={styles.gamesHub}>"Games Hub"</Text> пропонує широкий вибір ігор, що включають у себе:</Text>
					</View>
					<View style={styles.categories}>
						<View style={styles.itemCategories}>
							<Image style={styles.itemImage} source={require('../image/teamBild.png')}></Image>
							<Text style={styles.titemText}><Text style={styles.itemTextTitle}>Team building </Text> - спеціально розроблені ігри для підвищення співпраці, впевненості та взаєморозуміння в колективі. Вони допомагають покращити робочі відносини та ефективність групової роботи.</Text>
						</View>
						<View style={styles.itemCategories}>
							<Image style={styles.itemImage} source={require('../image/ice.png')}></Image>
							<Text style={styles.titemText}><Text style={styles.itemTextTitle}>Криголами </Text> -  ігри, спрямовані на зняття напруги та підвищення комфорту в колі незнайомих людей.</Text>
						</View>
						<View style={styles.itemCategories}>
							<Image style={styles.itemImage} source={require('../image/chalenge.png')}></Image>
							<Text style={styles.titemText}><Text style={styles.itemTextTitle}>Челенджі </Text> - стимулюючі завдання, які випробовують межі та навички учасників. Чи це фізичний челендж або інтелектуальний випробування, кожен знайде щось захопливе для себе.</Text>
						</View>
						<View style={styles.itemCategories}>
							<Image style={styles.itemImage} source={require('../image/iq.png')}></Image>
							<Text style={styles.titemText}><Text style={styles.itemTextTitle}>IQ </Text> - завдання та головоломки, які випробовують розум та логічне мислення. Вони розвивають креативність та аналітичні здібності.</Text>
						</View>
						<View style={styles.itemCategories}>
							<Image style={styles.itemImage} source={require('../image/estafeta.png')}></Image>
							<Text style={styles.titemText}><Text style={styles.itemTextTitle}>Естафети </Text> - змагання, які вимагають співпраці, швидкості та точності виконання завдань.</Text>
						</View>
						<View style={styles.itemCategories}>
							<Image style={styles.itemImage} source={require('../image/all.png')}></Image>
							<Text style={styles.titemText}><Text style={styles.itemTextTitle}>Загальнотабірні </Text> - веселі ігри, які підходять для будь-якого збору, від літнього табору до корпоративного заходу.</Text>
						</View>
						<View style={styles.itemCategories}>
							<Image style={styles.itemImage} source={require('../image/other.png')}></Image>
							<Text style={styles.titemText}><Text style={styles.itemTextTitle}>Інші </Text> - різноманітні стимулюючі завдання, які випробовують межі та навички учасників. Чи це фізичний челендж або інтелектуальний випробування, кожен знайде щось захопливе для себе.</Text>
						</View>
					</View>
					<View style={styles.textBlock}>
						<Text style={styles.text}>{'\t\t\t\t\t'}Наш додаток не тільки пропонує величезний вибір ігор, але й надає можливість користувачам ділитися своїми власними ідеями. Завдяки цьому <Text style={styles.gamesHub}>"Games Hub"</Text> стає не лише додатком, але й спільнотою людей, які люблять активний та захопливий спосіб проведення часу разом.</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		margin: 10,
	},
	text: {

	},
	iconBlock: {
		display: 'flex',
		alignItems: 'center',
		padding: 10,
	},
	text: {
		fontSize: 18,
		textAlign: 'justify',
		color: '#000000a6',
	},
	gamesHub: {
		color: '#8D6349',
		fontWeight: '900',
		fontSize: 22,
	},
	categories: {
		display: 'flex',
		gap: 10,
		paddingTop: 20,

	},
	itemCategories: {
		display: 'flex',
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	itemImage: {},
	titemText: {
		fontSize: 15,
		textAlign: 'justify',
	},
	itemTextTitle: {
		fontWeight: '900',
		color: '#8d6349ac',
	},
});

export default AboutApplication;
