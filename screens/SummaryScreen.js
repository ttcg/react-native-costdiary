import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import data from '../data/costitems.json';
import costTypeData from '../data/costtypes.json';
import Enumerable from 'linq';

const SummaryScreen = ({ route }) => {

	console.log(route)
	const onPress = (item) => console.log(item)

	// Array.prototype.sum = function(propertySelector = obj => obj) {
	// 	const intialValue = 0;
	// 	return this.reduce((sum, obj) => sum + propertySelector(obj), intialValue);
	//   };

	const getSubTotal = costTypeName => {
		let costTypeId = Enumerable.from(costTypeData).single(x => x.costTypeName === costTypeName).costTypeId;
		return Enumerable.from(data)
			.where(x => x.costType.costTypeId == costTypeId)
			.sum(x => x.amount);
	}

	const getTotal = () => {
		return Enumerable.from(data)
			.sum(x => x.amount);
	}

	return (
		<View style={styles.container} contentContainerStyle={styles.contentContainer}>
			<Item title="Groceries" amount={getSubTotal('Groceries')} onPress={onPress} />			
			<Item title="Dinner" amount={getSubTotal('Dinner')} onPress={onPress} />
			<Item title="NA" amount={getSubTotal('NA')} onPress={onPress} />
			<Item title="Diesel" amount={getSubTotal('Diesel')} onPress={onPress} />
			<Item title="TW Food" amount={getSubTotal('TW Food')} onPress={onPress} />
			<Item title="TW Others" amount={getSubTotal('TW Others')} onPress={onPress} />
			<Item title="AP" amount={getSubTotal('AP')} onPress={onPress} />
			<Item title="Others" amount={getSubTotal('Others')} onPress={onPress} /> 
			<ListItem
				title="Total"
				titleStyle={styles.totalStyle}
				rightTitle={`£ ${getTotal().toFixed(2)}`}
				rightTitleStyle={styles.totalStyle}
				containerStyle={{ borderTopWidth: 6 }}
				bottomDivider
			/>
		</View>
	);
}

const Item = ({ title, amount, onPress }) => {
	return (
		<TouchableOpacity
			onPress={() => onPress(title)}
		>
			<ListItem
				title={title}
				rightTitle={`£ ${amount.toFixed(2)}`}
				rightTitleStyle={styles.amountStyle}
				bottomDivider
			/>
		</TouchableOpacity>
	);
}

export default SummaryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	contentContainer: {
		paddingTop: 15,
	},
	amountStyle: {
		color: '#026b26'
	},
	totalStyle: {
		color: '#000000',
		fontWeight: 'bold'
	},
});