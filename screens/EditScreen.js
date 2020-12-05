import { Foundation } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'rn-material-ui-textfield'
import { Dropdown } from 'react-native-material-dropdown-v2';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Enumerable from 'linq';
import { createPatch } from 'rfc6902';
import Dates from 'react-native-dates';

import {
    selectCostTypes
} from "../store/costTypesReducer";
import {
    triggerEditCostItem,
    resetCostItemMaintenance,
    selectCostItems
} from '../store/costItemsReducer'

const EditScreen = ({ navigation, route }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: 'Edit Item Detail' });
    }, [navigation]);

    const { item } = route.params;
    //console.log(item)

    const dispatch = useDispatch();

    const { costTypes } = useSelector(selectCostTypes);
    const { hasUpdated } = useSelector(selectCostItems);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => setDatePickerVisibility(true);

    const hideDatePicker = () => setDatePickerVisibility(false);

    const renderRightIcon = (iconName) => (
        <Foundation
            name={iconName}
            size={24}
            color='black'
        />
    );

    useEffect(() => {
        if (hasUpdated) {
            dispatch(resetCostItemMaintenance())
            navigation.goBack();
        }
    }, [hasUpdated, navigation]);

    const handleDateConfirm = ({ date }, setFieldValue) => {
        console.log(date)
        hideDatePicker();
        setFieldValue('dateUsed', moment(date).format("YYYY-MM-DD"));
    };

    const costTypeData = Enumerable.from(costTypes)
        .select(x => ({ value: x.costTypeId, label: x.costTypeName }))
        .orderBy(x => x.label)
        .toArray();

    const initialValues = {
        costItemId: item.costItemId,
        itemName: item.itemName,
        costTypeId: item.costType.costTypeId,
        amount: parseFloat(item.amount).toFixed(2),
        dateUsed: moment(item.dateUsed).format("YYYY-MM-DD")
    }

    const validationSchema = Yup.object({
        itemName: Yup.string()
            .max(25)
            .required('Required'),
        costTypeId: Yup.string()
            .required('Required'),
        amount: Yup.number()
            .typeError('must be in number format')
            .positive('must be greater than ZERO')
            .required('Required'),
        dateUsed: Yup.date()
            .typeError('must be in date format')
            .max(new Date())
            .required('Required')
    })

    return (
        <SafeAreaView style={styles.formContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {

                    const jsonPatch = createPatch(initialValues, values);
                    console.log(jsonPatch)

                    if (Array.isArray(jsonPatch) && jsonPatch.length) {
                        dispatch(triggerEditCostItem(values.costItemId, jsonPatch))
                    }
                    else {
                        navigation.goBack();
                    }
                    
                    setSubmitting(false)
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue,
                    isSubmitting, values, errors }) => (

                        <View>
                            <TextField
                                onChangeText={handleChange("itemName")}
                                onBlur={handleBlur("itemName")}
                                label='Description'
                                value={values.itemName}
                                error={errors.itemName}
                            />
                            <Dropdown
                                onChangeText={handleChange("costTypeId")}
                                label='Cost Type'
                                value={values.costTypeId}
                                data={costTypeData}
                                itemCount={10}
                            />
                            <TextField
                                onChangeText={handleChange("amount")}
                                onBlur={handleBlur("amount")}
                                label='Amount'
                                value={values.amount}
                                keyboardType='decimal-pad'
                                error={errors.amount}
                                renderRightAccessory={() => renderRightIcon('pound')}
                            />
                            <Input
                                onChangeText={handleChange("dateUsed")}
                                onBlur={handleBlur("dateUsed")}
                                value={values.dateUsed}
                                label='Date'
                                labelStyle={{ fontWeight: "normal" }}
                                errorStyle={{ color: 'red' }}
                                errorMessage={errors.dateUsed}
                                rightIcon={renderRightIcon('calendar')}
                                onFocus={showDatePicker}
                                keyboardType='decimal-pad'
                            />      
                            <Modal
                                transparent
                                animationType="fade"
                                visible={isDatePickerVisible}>
                                <View style={styles.contentContainer}>
                                    <Dates
                                        date={values.dateUsed}
                                        onDatesChange={date => handleDateConfirm(date, setFieldValue)}
                                        isDateBlocked={() => false}
                                    />
                                </View>
                            </Modal>
                            <Button
                                title="Save"
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                loadingProps={{ size: "large", color: "white" }}
                            />
                        </View>
                    )}
            </Formik>
        </SafeAreaView>
    );
}

export default EditScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    saveButtonContainer: {
        marginTop: 12
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    defaultValueColor: {
        color: '#000000',
    },
    formContainer: {
        margin: 10
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
});
