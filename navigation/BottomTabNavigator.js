import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import moment from 'moment'

import {
  selectSettings
} from './../store/settingsReducer'
import TabBarIcon from '../components/TabBarIcon';
import ToolsScreen from '../screens/ToolsScreen';
import ItemsListScreen from '../screens/ItemsListScreen';
import AddNewScreen from '../screens/AddNewScreen';
import SummaryScreen from '../screens/SummaryScreen';
import FilterScreen from '../screens/FilterScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'List';

export default function BottomTabNavigator({ navigation, route }) {

  const [isFilterVisible, toggleFilter] = useState(false);
  const { currentDate } = useSelector(selectSettings);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route, currentDate) });
  }, [navigation, route]);

  return (
    <>
      <BottomTab.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        tabBarOptions={{
          inactiveBackgroundColor: '#42a5f5',
          inactiveTintColor: '#ffffff'
        }}
      >
        <BottomTab.Screen
          name="List"
          component={ItemsListScreen}
          options={{
            title: 'List',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" iconType="ion" />,
          }}
        />
        <BottomTab.Screen
          name="Filter"
          component={FilterScreen}
          options={{
            title: 'Filter',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="filter" iconType="material" />,
          }}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              toggleFilter();
            },
          })}
        />
        <BottomTab.Screen
          name="AddNew"
          component={AddNewScreen}
          options={{
            title: 'Add',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" iconType="ion" />
          }}
          listeners={({ navigation, route }) => ({
            tabPress: e => {
              e.preventDefault();
              navigation.push('AddNew');
            },
          })}
        />
        <BottomTab.Screen
          name="Summary"
          component={SummaryScreen}
          options={{
            title: 'Summary',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="format-list-numbered" iconType="material" />,
          }}
        />
        <BottomTab.Screen
          name="Tools"
          component={ToolsScreen}
          options={{
            title: 'Tools',
            tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-settings" iconType="ion" />,
          }}
        />
      </BottomTab.Navigator>
      <FilterScreen 
        isVisible={isFilterVisible} 
        navigation={navigation} 
        route={route}
        toggleFilter={toggleFilter} 
        getHeaderTitle={getHeaderTitle} />
    </>
  );
}

const getHeaderTitle = (route, currentDate) => {
  console.log('currentDate: ', currentDate)
  const routeName = getFocusedRouteNameFromRoute(route) ?? INITIAL_ROUTE_NAME;
  const dateInRedux = moment(currentDate)
  const dateFormatText = dateInRedux.format('MMM - YYYY')
  switch (routeName) {
    case 'List':
      return `List (${dateFormatText})`;
    case 'Summary':
      return `Summary (${dateFormatText})`;
    default:
      return routeName;
  }
}
