import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import MonthPicker from 'react-native-month-picker';

import {
  triggerSetCurrentDate,
  selectSettings
} from './../store/settingsReducer'

const FilterScreen = ({ toggleFilter, isVisible }) => {

  const dispatch = useDispatch();

  const { currentDate } = useSelector(selectSettings);
  const [selectedDate, onChange] = useState(null);

  const onConfirm = () => {

    const dateInRedux = moment(currentDate)
    const dateChosen = moment(selectedDate)

    // do not dispatch anything if the current and selected year / month are the same
    if (selectedDate === null || (dateInRedux.year() === selectedDate.year() &&
      dateInRedux.month() === selectedDate.month())) {
        console.log('nothing changed')
      toggleFilter(false);
      return;
    }

    let unixDate = moment(selectedDate).valueOf()
    dispatch(triggerSetCurrentDate(unixDate))
    toggleFilter(false);
  }

  return (
    <View style={styles.container}>
      <Modal
        transparent
        animationType="fade"
        visible={isVisible}>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text h3>Choose Month</Text>
            <Divider style={{ backgroundColor: 'blue' }} />
            <MonthPicker
              selectedDate={selectedDate || currentDate}
              onMonthChange={onChange}
            />
            <View>
              <Button
                style={styles.confirmButton}
                icon={
                  <Icon
                    name="check-circle"
                    size={20}
                    color="white"
                    style={styles.buttonIcon}
                  />
                }
                title="Confirm"
                onPress={onConfirm}
                raised
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default FilterScreen;

const styles = StyleSheet.create({
  buttonIcon: {
    margin: 5
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 70,
  },
  confirmButton: {
    borderWidth: 0.5,
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});