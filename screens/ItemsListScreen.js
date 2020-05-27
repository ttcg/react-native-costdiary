import React from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import moment from "moment";

import data from '../data/costitems.json';
import ItemList from '../components/ItemList'

const ItemsListScreen = ({ route, navigation }) => {
    console.log(route)
    return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>            
            <ItemList data={data} navigation={navigation} />
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
