import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import ItemList from '../components/ItemList'
import {
    selectCostItems,
    fetchCostItemsWithFilter
} from "./../store/costItemsReducer";
import {
    selectSettings
  } from './../store/settingsReducer'

const ItemsListScreen = ({ navigation }) => {

    const { costItems } = useSelector(selectCostItems);
    const { currentDate } = useSelector(selectSettings);    

    const dispatch = useDispatch();

    useEffect(() => {        
        const dateInRedux = moment(currentDate)
        dispatch(fetchCostItemsWithFilter(dateInRedux.year(), dateInRedux.month() + 1))
    }, [dispatch]);

    return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ItemList data={costItems} navigation={navigation} />
        </View>
    );
}

export default ItemsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingTop: 15,
    }
});