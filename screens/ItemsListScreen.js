import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import ItemList from '../components/ItemList'
import {
    selectCostItems,
    fetchCostItems
} from "./../store/costItemsReducer";

const ItemsListScreen = ({ route, navigation }) => {

    const { costItems, loading, hasErrors } = useSelector(selectCostItems);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCostItems())
    }, [dispatch]);

    console.log(route)
    return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            {loading && <Text>Loading posts...</Text>}
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
