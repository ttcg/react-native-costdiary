import React, { useEffect, useRef, useState } from 'react';
import { SplashScreen } from 'expo';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import useLinking from './navigation/useLinking';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import ItemDetailScreen from './screens/ItemDetailScreen';
import AddNewScreen from './screens/AddNewScreen';
import SummaryItemsListScreen from './screens/SummaryItemsListScreen';
import { fetchCostTypes } from './store/costTypesReducer'

const Stack = createStackNavigator();

const Body = (props) => {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [initialNavigationState, setInitialNavigationState] = useState();
    const containerRef = useRef();
    const { getInitialState } = useLinking(containerRef);

    const dispatch = useDispatch()

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                dispatch(fetchCostTypes())

            } catch (e) {
                console.warn(e);
            }
            finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, [dispatch]);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: styles.headerStyle,
                            headerTitleStyle: styles.headerTitleStyle
                        }}>
                        <Stack.Screen name="Root" component={BottomTabNavigator} />
                        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
                        <Stack.Screen name="SummaryItemsListScreen" component={SummaryItemsListScreen} />
                        <Stack.Screen name="AddNew" component={AddNewScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}

export default Body;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerStyle: {
        backgroundColor: '#00AEEF'
    },
    headerTitleStyle: {
        color: '#fff'
    }
});