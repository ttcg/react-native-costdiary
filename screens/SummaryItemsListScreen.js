import React from 'react';
import { StyleSheet, View } from 'react-native';
import ItemList from '../components/ItemList'

const SummaryItemsListScreen = ({ route, navigation }) => {
    const { data } = route.params;

    return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ItemList data={data} navigation={navigation} />
        </View>
    );
}

export default SummaryItemsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96b6f2',
    },
    contentContainer: {
        paddingTop: 15,
    }
});
