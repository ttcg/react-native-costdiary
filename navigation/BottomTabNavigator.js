import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ItemsListScreen from '../screens/ItemsListScreen';
import AddNewScreen from '../screens/AddNewScreen';
import SummaryScreen from '../screens/SummaryScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        initialParams="Home Params"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" iconType="ion" />,
        }}
      />
      <BottomTab.Screen
        name="CurrentMonth"
        component={ItemsListScreen}
        initialParams={{ month: 4 }}
        options={{
          title: 'Current Month',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" iconType="ion" />,
        }}
      />
      <BottomTab.Screen
        name="PrevMonth"
        component={ItemsListScreen}
        initialParams={{ month: 3 }}
        options={{
          title: 'Previous Month',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="page-previous-outline" iconType="material" />,
        }}
      />
      <BottomTab.Screen
        name="AddNew"
        component={AddNewScreen}
        options={{
          title: 'Add',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" iconType="ion" />,
        }}
      />
      <BottomTab.Screen
        name="Summary"
        component={SummaryScreen}
        options={{
          title: 'Summary',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="format-list-numbered" iconType="material" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'CurrentMonth':
      return 'Current Month';
    case 'PrevMonth':
      return 'Previous Month';
    case 'AddNew':
      return 'Add New Item';
    default:
      return routeName;
  }
}
