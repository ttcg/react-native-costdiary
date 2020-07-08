import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import moment from "moment";
import { Button, Divider } from 'react-native-elements';

const ItemDetailScreen = ({ route }) => {
	const { item } = route.params;

	const LineDetail = ({ label, text, showDivider = true }) => {
		return (
			<>
				<Text style={styles.labelStyle}>{label}</Text>
				<Text style={styles.contentStyle}>{text}</Text>
				{showDivider && <Divider style={{ backgroundColor: '#cecaca' }} />}
			</>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<LineDetail label='Amount' text={`£ ${parseFloat(item.amount).toFixed(2)}`} />
				<LineDetail label='Description' text={item.itemName} />
				<LineDetail label='Type' text={item.costType.costTypeName} />
				<LineDetail label='Transaction Date' text={moment(item.dateUsed).format("MMM DD")} showDivider={false} />
			</View>
			<View style={styles.contentContainer}>
				<Button raised title="Edit" />
			</View>
		</View>
	);
}

export default ItemDetailScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	contentContainer: {
		backgroundColor: '#fafafa',
		paddingHorizontal: 15,
		margin: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#fff'
	},
	labelStyle: {
		marginTop: 15,
		color: '#777575',
		fontWeight: "bold"
	},
	contentStyle: {
		marginTop: 5,
		marginBottom: 20,
		fontSize: 16
	},
});