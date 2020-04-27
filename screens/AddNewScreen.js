import { Ionicons, Foundation } from '@expo/vector-icons';
import React from 'react';  
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Button, Input } from 'react-native-elements';

export default function AddNewScreen() {
  return (
    <View>
      <Input
        label='Item Name'
        placeholder='Type Item Name'
      />
      <Input
        label='Type'
        placeholder='Choose Type'
      />
      <Input
        label='Amount'
        placeholder='Type Amount'
        leftIcon={
          <Foundation
            name='pound'
            size={24}
            color='black'
          />
        }
        leftIconContainerStyle={styles.leftIconContainer}
      />
      <Input
        label='Date'
        placeholder='Type Date'
        leftIcon={
          <Foundation
            name='calendar'
            size={24}
            color='black'
          />
        }
        leftIconContainerStyle={styles.leftIconContainer}
      />
      <Button
        title="Save"
        raised
        containerStyle={styles.saveButtonContainer}
      />
    </View>
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
  leftIconContainer: {
    marginRight: 12,
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
});
