import React, { useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import useCachedResources from './hooks/useCachedResources';
import Toaster from './components/Toaster';
import Spinner from './components/Spinner';
import Navigator from './components/Navigator';
import { fetchCostTypes } from './store/costTypesReducer'

const Body = () => {
    const isLoadingComplete = useCachedResources();

    const dispatch = useDispatch();  

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadDataAsync() {
            try {
                // Load our initial navigation state

                dispatch(fetchCostTypes())
            } catch (e) {
                console.warn(e);
            }
        }

        loadDataAsync();
    }, [dispatch]);

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <Navigator />
                <Toaster />
                <Spinner />
            </View>
        );
    }
}

export default Body;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});