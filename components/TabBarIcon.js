import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

const TabBarIcon = (props) => {

  const { name, focused, iconType } = props;

  return (
    <>
      {iconType === 'ion' &&
        <Ionicons
          name={name}
          size={30}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      }
      {iconType === 'material' &&
        <MaterialCommunityIcons
          name={name}
          size={30}
          style={{ marginBottom: -3 }}
          color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
        />
      }
    </>
  );
}

export default TabBarIcon;