import React from 'react';
import { StyleSheet, View} from 'react-native';
import { useSelector } from "react-redux";

import ItemList from '../components/ItemList'
import {
    selectCostItems
  } from "./../store/costItemsReducer";

const ItemsListScreen = ({ route, navigation }) => {

    const costItems = useSelector(selectCostItems);

    console.log(route)
    return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>            
            <ItemList data={costItems} navigation={navigation} />
        </View>
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
    }
});
