import * as React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements'
import moment from "moment";
import Enumerable from 'linq';

const ItemList = ({ data, navigation }) => {
    const onPress = (item) => navigation.navigate('ItemDetail', { item: item })

    const costItemsData = Enumerable.from(data)
        .select(x => x)
        .orderByDescending(x => x.dateUsed)
        .toArray();

    return (
        <FlatList
            data={costItemsData}
            renderItem={({ item }) => <Item item={item} onPress={onPress} />}
            keyExtractor={item => item.costItemId}
            ListEmptyComponent={ListEmpty}
        />
    );
}

const ListEmpty = () => {
    return (
        <View style={styles.emptyListContainer}>
            <Text h4>No items to display</Text>
        </View>
    );
}

const Item = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(item)}
        >
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{item.itemName}</ListItem.Title>
                    <ListItem.Subtitle>{item.costType.costTypeName}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Content right>
                    <ListItem.Title right style={styles.amountStyle}>
                        {`£ ${parseFloat(item.amount).toFixed(2)}`}
                    </ListItem.Title>
                    <ListItem.Subtitle right>
                        {moment(item.dateUsed).format("MMM DD")}
                    </ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    );
}

export default ItemList;

const styles = StyleSheet.create({
    amountStyle: {
        color: '#026b26'
    },
    emptyListContainer: {
        padding: 10
    }
});