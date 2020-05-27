import * as React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import moment from "moment";

const ItemList = ({ data, navigation }) => {
    const onPress = (item) => navigation.navigate('ItemDetail', { item: item })
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} onPress={onPress} />}
            keyExtractor={item => item.costItemId}
        />
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
            />
        </TouchableOpacity>
    );
}

export default ItemList;

const styles = StyleSheet.create({
    amountStyle: {
        color: '#026b26'
    },
});