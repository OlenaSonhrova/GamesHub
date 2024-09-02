import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TextPrivacyPolice = () => {

	return (
		<View>
			<Text style={styles.tcP}>Угода користувача</Text>
			<Text style={styles.tcL}>Ласкаво просимо до "Games Hub"!</Text>
			<Text style={styles.tcL}>Ця угода користувача ("Угода") визначає умови використання мобільного застосунку "Games Hub". Користуючись застосунком "Games Hub", ви погоджуєтеся з умовами цієї Угоди. Будь ласка, уважно прочитайте цей документ перед використанням застосунку.</Text>
			<Text style={styles.tcP}>Політика конфіденційності</Text>
			<Text style={styles.tcL}>Ваша конфіденційність є дуже важливою для нас. Ми прагнемо забезпечити захист вашої особистої інформації та надати вам зрозуміле уявлення про те, як ми збираємо, використовуємо, захищаємо та оприлюднюємо вашу інформацію в контексті використання застосунку "Games Hub".</Text>
			<Text style={styles.tcLT}>{'\u2022'} Збір інформації: Ми можемо збирати особисту інформацію, яку ви надаєте під час реєстрації або використання застосунку "Games Hub", таку як ім'я, адреса електронної пошти та інші контактні дані.</Text>
			<Text style={styles.tcLT}>{'\u2022'} Використання інформації: Ми використовуємо зібрану інформацію для забезпечення функціональності застосунку, надання вам доступу до доступних ігор та розваг, а також для комунікації з вами щодо вашого використання застосунку.</Text>
			<Text style={styles.tcLT}>{'\u2022'} Захист інформації: Ми приділяємо велику увагу захисту вашої особистої інформації і вживаємо відповідних заходів для її захисту від несанкціонованого доступу, зміни, розголошення чи знищення.</Text>
			<Text style={styles.tcLT}>{'\u2022'} Поділ інформації: Ми не розголошуємо особисту інформацію користувачів третім особам без вашого попереднього згоди, за винятком випадків, передбачених законодавством.</Text>
			<Text style={styles.tcLT}>{'\u2022'} Зміни в політиці конфіденційності: Ми можемо час від часу оновлювати цю політику конфіденційності. Будь ласка, періодично переглядайте цей документ, щоб бути в курсі будь-яких змін.</Text>
			<Text style={styles.tcP}>Відмова від відповідальності</Text>
			<Text style={styles.tcL}>Ми робимо все можливе для забезпечення надійності та точності інформації, наданої в застосунку "Games Hub". Однак ми не несемо відповідальності за будь-які втрати або шкоди, спричинені використанням або недоступністю інформації в застосунку.</Text>
			<Text style={styles.tcP}>Заключні положення</Text>
			<Text style={styles.tcL}>Ця Угода і Політика конфіденційності встановлюють повний обсяг угоди між вами та "Games Hub" щодо вашого використання застосунку, і замінюють всі попередні або одночасні угоди та домовленості щодо предмета цієї Угоди.</Text>
			<Text style={styles.tcL}>Дякуємо за використання застосунку "Games Hub"! Якщо у вас виникли питання або зауваження, будь ласка, зв'яжіться з нами за адресою esongrovaa@gmail.com</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	tcP: {
		marginTop: 10,
		marginBottom: 10,
		fontSize: 16,
		fontWeight: '900',
		color: '#363535cb',
	},
	tcL: {
		marginBottom: 10,
		fontSize: 14,
		textAlign: 'justify',
		color: '#363535cb',
	},
	tcLT: {
		marginLeft: 10,
		textAlign: 'justify',
		marginBottom: 10,
		color: '#363535cb',
	},
});

export default TextPrivacyPolice;