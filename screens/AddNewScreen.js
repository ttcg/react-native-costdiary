import { Ionicons, Foundation } from '@expo/vector-icons';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField } from "react-native-material-textfield";
import { Dropdown } from 'react-native-material-dropdown';
import data from '../data/costtypes.json';

export default function AddNewScreen() {

  const renderRightIcon = (iconName) => (
    <Foundation
      name={iconName}
      size={24}
      color='black'
    />
  );

  let costTypeData = data.map(v => ({ value: v.costTypeId, label: v.costTypeName })).sort(function (a, b) {
    return a.label > b.label ? 1 : -1;
  })

  return (
    <SafeAreaView style={styles.formContainer}>
      <Formik
        initialValues={{
          costItemId: 'cc82c94a-d927-4afb-a8ae-e4891b2a4947',
          itemName: '',
          costTypeId: '',
          amount: '',
          dateUsed: ''
        }}
        validationSchema={Yup.object({
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
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values)
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TextField
              name='itemName'
              onChangeText={handleChange("itemName")}
              onBlur={handleBlur("itemName")}
              label='Item Name'
              error={errors.itemName}
            />
            <Dropdown
              name='costTypeId'
              onChangeText={handleChange("costTypeId")}
              label='Cost Type'
              data={costTypeData}
              itemCount={10}
            />
            <TextField
              name='amount'
              onChangeText={handleChange("amount")}
              onBlur={handleBlur("amount")}
              label='Amount'
              keyboardType='decimal-pad'
              error={errors.amount}
              renderRightAccessory={() => renderRightIcon('pound')}
            />
            <TextField
              name='dateUsed'
              onChangeText={handleChange("dateUsed")}
              onBlur={handleBlur("dateUsed")}
              label='Date'
              keyboardType='decimal-pad'
              error={errors.dateUsed}
              renderRightAccessory={() => renderRightIcon('calendar')}
            />
            <Button
              title="Submit"
              onPress={handleSubmit}
              loadingProps={{ size: "large", color: "white" }}
            />
          </View>

        )}
      </Formik>
    </SafeAreaView>
  );
}

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
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  formContainer: {
    margin: 10
  }
});
