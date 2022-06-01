import React from 'react';
import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SportsTab} from './SportsTab';

export const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <SportsTab />
      </SafeAreaView>
    </NavigationContainer>
  );
};
