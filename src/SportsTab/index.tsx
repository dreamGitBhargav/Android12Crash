import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const dummy = () => null;

export function SportsTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: 'auto',
        },
      }}>
      <Tab.Screen name="Tab1" component={dummy} />
      <Tab.Screen name="Tab2" component={dummy} />
      <Tab.Screen name="Tab3" component={dummy} />
      <Tab.Screen name="Tab4" component={dummy} />
      <Tab.Screen name="Tab5" component={dummy} />
      <Tab.Screen name="Tab6" component={dummy} />
      <Tab.Screen name="Tab7" component={dummy} />
      <Tab.Screen name="Tab8" component={dummy} />
      <Tab.Screen name="Tab9" component={dummy} />
    </Tab.Navigator>
  );
}
