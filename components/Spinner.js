import * as React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { selectSpinner } from '../store/spinnerReducer'

const Spinner = () => {

    const { numberOfAjaxCall } = useSelector(selectSpinner);
    const dispatch = useDispatch();

    return (
        <>
            {numberOfAjaxCall > 0 &&
                <View>
                    <Modal transparent={true}>
                        <View style={styles.container}>
                            <ActivityIndicator size="large" color="#000" style={styles.activity} />
                        </View>
                    </Modal>

                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center',
        backgroundColor: '#ccc',
        opacity: 0.5,

    },
    activity: {
        transform: [{ scale: 2 }]
    }
});

export default Spinner;