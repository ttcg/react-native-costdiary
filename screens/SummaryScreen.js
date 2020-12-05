import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import Enumerable from 'linq';
import { useSelector } from "react-redux";

import { selectCostItems } from "./../store/costItemsReducer";
import { selectCostTypes } from "./../store/costTypesReducer";

const SummaryScreen = ({ navigation }) => {

	const { costItems } = useSelector(selectCostItems);
	const { costTypes } = useSelector(selectCostTypes);

	const onPress = (costTypeName) => {
		let filteredData = Enumerable.from(costItems)
			.where(x => x.costType.costTypeId == getCostTypeId(costTypeName))
			.toArray();

		navigation.navigate('SummaryItemsListScreen', { data: filteredData, dataType: costTypeName })
	}

	const getSubTotal = costTypeName => {
		return Enumerable.from(costItems)
			.where(x => x.costType.costTypeId == getCostTypeId(costTypeName))
			.sum(x => parseFloat(x.amount));
	}

	const getCostTypeId = costTypeName => Enumerable.from(costTypes).single(x => x.costTypeName === costTypeName).costTypeId;

	const getTotal = () => {
		return Enumerable.from(costItems)
			.sum(x => parseFloat(x.amount));
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
			<TotalItem title="Total" amount={getTotal().toFixed(2)} />
		</View>
	);
}

const Item = ({ title, amount, onPress }) => {
	return (
		<TouchableOpacity
			onPress={() => onPress(title)}
		>
			<ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                    <ListItem.Title right style={styles.amountStyle}>
                        {`£ ${parseFloat(amount).toFixed(2)}`}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
		</TouchableOpacity>
	);
}

const TotalItem = ({ title, amount }) => {
	return (
			<ListItem containerStyle={{ borderTopWidth: 6 }} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Content right>
                    <ListItem.Title right style={styles.amountStyle}>
                        {`£ ${parseFloat(amount).toFixed(2)}`}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
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