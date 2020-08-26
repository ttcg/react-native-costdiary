import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import {
    triggerResetCostItemsData
} from "../store/costItemsReducer";

export default function HomeScreen() {
    const dispatch = useDispatch()

    return (
        <View>
            <Button
                title="Reset"
                onPress={() => dispatch(triggerResetCostItemsData())}
                containerStyle={styles.buttonContainer}
            />
        </View>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    buttonContainer: {
        margin: 10
    }
});
