import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import data from '../data/costitems.json';

const SummaryScreen = ({ route }) => {
		
		console.log(route)
		const onPress = (item) => console.log(item)

		Array.prototype.sum = function(propertySelector = obj => obj) {
			const intialValue = 0;
			return this.reduce((sum, obj) => sum + propertySelector(obj), intialValue);
		  };

		return (
		  <View style={styles.container} contentContainerStyle={styles.contentContainer}>
			<Item title="Groceries" amount={data.sum(x => x.amount)} onPress={onPress} />
			<Item title="Dinner" amount={data.sum(x => x.amount)} onPress={onPress} />
			<Item title="NA" amount={data.sum(x => x.amount)} onPress={onPress} />
			<Item title="Diesel" amount={data.sum(x => x.amount)} onPress={onPress} />
			<Item title="TW" amount={data.sum(x => x.amount)} onPress={onPress} />
			<Item title="TW Others" amount={data.sum(x => x.amount)} onPress={onPress} />
			<Item title="AP" amount={data.sum(x => x.amount)} onPress={onPress} />
			<Item title="Others" amount={data.sum(x => x.amount)} onPress={onPress} />
			<ListItem
			  title="Total"
			  titleStyle={styles.totalStyle}
			  rightTitle={`£ ${data.sum(x => x.amount).toFixed(2)}`}
			  rightTitleStyle={styles.totalStyle}
				containerStyle={{borderTopWidth: 6}}
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