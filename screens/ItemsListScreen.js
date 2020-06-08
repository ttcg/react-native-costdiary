import React from 'react';
import { StyleSheet, View} from 'react-native';

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
