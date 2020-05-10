import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import moment from "moment";

import data from '../data/costitems.json';
import ItemDetailScreen from './ItemDetailScreen'

const ItemsListScreen = ({ route, navigation }) => {
  console.log(route)
  const onPress = (item) => navigation.navigate('ItemDetail', { item: item })
  return (
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} onPress={onPress} />}
        keyExtractor={item => item.costItemId}
      />
    </View>
  );
}

const Item = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
    >
      <ListItem
        title={item.itemName}
        subtitle={item.costType.costTypeName}
        rightTitle={`£ ${item.amount.toFixed(2)}`}
        rightTitleStyle={styles.amountStyle}
        rightSubtitle={moment(item.dateUsed).format("MMM DD")}        
        bottomDivider
        linearGradientProps={{
          colors: ['#d5deef', '#c5d8fa'],
          start: { x: 1, y: 0 },
          end: { x: 0.2, y: 0 },
        }}
      />
    </TouchableOpacity>
  );
}

export default ItemsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96b6f2',
  },
  contentContainer: {
    paddingTop: 15,
  },
  amountStyle: {
    color: '#026b26'
  },
});
