import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { ListItem } from 'react-native-elements'
import moment from "moment";

import data from '../data/costitems.json';


export default function ItemsListScreen() {
  console.log(data)
  return (
    <SafeAreaView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.costItemId}
      />
    </SafeAreaView>
  );

}

function Item({ item }) {
  return (
    <ListItem
      title={item.itemName}
      subtitle={item.costType.costTypeName}
      rightTitle={`£ ${item.amount.toFixed(2)}`}
      rightTitleStyle={styles.amountStyle}
      rightSubtitle={moment(item.dateUsed).format("MMM DD")}      
      bottomDivider
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  amountStyle: {
    color: '#026b26'
  },
});
