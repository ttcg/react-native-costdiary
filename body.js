import React, { useEffect, useRef, useState } from 'react';
import { SplashScreen } from 'expo';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import useLinking from './navigation/useLinking';
import Toaster from './components/Toaster';
import Spinner from './components/Spinner';
import Navigator from './components/Navigator';
import { fetchCostTypes } from './store/costTypesReducer'

const Body = (props) => {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [initialNavigationState, setInitialNavigationState] = useState();
    const containerRef = useRef();
    const dispatch = useDispatch();
    const { getInitialState } = useLinking(containerRef);    

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
                <Navigator navigationState={initialNavigationState} />
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