import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import moment from "moment";
import { Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";

import {
	triggerDeleteCostItem,
	selectCostItems,
	resetCostItemAdd
} from './../store/costItemsReducer'

const ItemDetailScreen = ({ route, navigation }) => {
	const { item } = route.params;

	const dispatch = useDispatch();

	const { hasSubmitted } = useSelector(selectCostItems);

	useEffect(() => {
        if (hasSubmitted) {
            dispatch(resetCostItemAdd())
            navigation.navigate('Root')
        }
    }, [hasSubmitted, navigation]);

	const LineDetail = ({ label, text, showDivider = true }) => {
		return (
			<>
				<Text style={styles.labelStyle}>{label}</Text>
				<Text style={styles.contentStyle}>{text}</Text>
				{showDivider && <Divider style={{ backgroundColor: '#cecaca' }} />}
			</>
		);
	}

	const handleDelete = (id) => {
		Alert.alert(
			"Confirm Delete",
			"Are you sure that you want to delete this record?",
			[
				{
					text: "No",
					onPress: () => console.log("No Pressed"),
					style: "cancel"
				},
				{
					text: "Yes", onPress: () => {
						dispatch(triggerDeleteCostItem(id))
					}
				}
			],
			{ cancelable: false }
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
			<View style={styles.buttonContainer}>
				<Button
					containerStyle={styles.button}
					icon={
						<Icon
							name="edit"
							size={18}
							color="white"
							style={styles.buttonIcon}
						/>
					} raised title="Edit" />
				<Button
					containerStyle={styles.button}
					onPress={() => handleDelete(item.costItemId)}
					icon={
						<MaterialCommunityIcons
							name="delete-forever"
							size={18}
							color="white"
							style={styles.buttonIcon}
						/>
					} raised title="Delete" />
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
	buttonContainer: {
		margin: 15,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	buttonIcon: {
		margin: 5
	},
	button: {
		backgroundColor: 'green',
		width: '40%',
		height: 40
	}
});