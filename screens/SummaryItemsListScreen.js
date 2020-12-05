import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Enumerable from 'linq';
import ItemList from '../components/ItemList'

const SummaryItemsListScreen = ({ route, navigation }) => {

    const { data, dataType } = route.params;

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: `Items for ${dataType}` });    
      }, [navigation]);

    return (
        <View style={styles.container} contentContainerStyle={styles.contentContainer}>
            {Enumerable.from(data).any() &&
                <ItemList data={data} navigation={navigation} />
            }
            {Enumerable.from(data).any() == false &&
                <Text style={styles.noItemsText}>
                    There are no items to display
                </Text>
            }
        </View>
    );
}

export default SummaryItemsListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        paddingTop: 15,
    },
    noItemsText : {
        padding: 15,
        fontSize: 20
    }
});
