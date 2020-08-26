import { Foundation } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'react-native-materialui-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Enumerable from 'linq';

import uuid from '../common/uuid'
import {
    selectCostTypes
} from "./../store/costTypesReducer";
import {
    triggerAddCostItem,
    resetCostItemMaintenance,
    selectCostItems
} from './../store/costItemsReducer'



const AddNewScreen = ({ navigation }) => {

    navigation.setOptions({ headerTitle: 'Add New Item' });

    const dispatch = useDispatch();

    const { costTypes } = useSelector(selectCostTypes);
    const { hasAdded } = useSelector(selectCostItems);

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
        if (hasAdded) {
            dispatch(resetCostItemMaintenance())
            navigation.navigate('Root')
        }
    }, [hasAdded, navigation]);

    const handleDateConfirm = (date, setFieldValue) => {
        hideDatePicker();
        setFieldValue('dateUsed', moment(date).format("YYYY-MM-DD"));
    };

    const costTypeData = Enumerable.from(costTypes)
        .select(x => ({ value: x.costTypeId, label: x.costTypeName }))
        .orderBy(x => x.label)
        .toArray();

    const initialValues = {        
        itemName: '',
        costTypeId: 'a10b83aa-795a-460a-b0a1-0b051871f46c',
        amount: null,
        dateUsed: moment(new Date()).format("YYYY-MM-DD")
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

                    values.costItemId = uuid()
                    values.costType = Enumerable.from(costTypes).single(x => x.costTypeId === values.costTypeId);

                    //console.log(values)

                    const payload = {
                        "itemName": values.itemName,
                        "costTypeId": values.costTypeId,
                        "amount": values.amount,
                        "dateUsed": values.dateUsed
                    }

                    dispatch(triggerAddCostItem(values))
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
                            <TextField
                                onChangeText={handleChange("dateUsed")}
                                onBlur={handleBlur("dateUsed")}
                                onFocus={showDatePicker}
                                label='Date'
                                baseColor='#000000'
                                value={values.dateUsed}
                                keyboardType='decimal-pad'
                                error={errors.dateUsed}
                                renderRightAccessory={() => renderRightIcon('calendar')}
                            />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={date => handleDateConfirm(date, setFieldValue)}
                                onCancel={hideDatePicker}
                            />
                            <Button
                                title="Add"
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

export default AddNewScreen;

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
    }
});
