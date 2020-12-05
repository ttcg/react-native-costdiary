import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from '../navigation/BottomTabNavigator';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import AddNewScreen from '../screens/AddNewScreen';
import EditScreen from '../screens/EditScreen';
import SummaryItemsListScreen from '../screens/SummaryItemsListScreen';

const Stack = createStackNavigator();

const Navigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: styles.headerStyle,
                    headerTitleStyle: styles.headerTitleStyle
                }}>
                <Stack.Screen name="Root" component={BottomTabNavigator} />
                <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
                <Stack.Screen name="EditScreen" component={EditScreen} />                
                <Stack.Screen name="AddNew" component={AddNewScreen} />
                <Stack.Screen name="SummaryItemsListScreen" component={SummaryItemsListScreen} />
            </Stack.Navigator>
        </NavigationContainer>


    );
}

export default Navigator;

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#00AEEF'
    },
    headerTitleStyle: {
        color: '#fff'
    }
});