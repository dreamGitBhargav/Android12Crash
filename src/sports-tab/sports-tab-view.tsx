import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import {sportsTabStyles} from './sports-tab.styles';

export const sportsTabColors = {
  inActive: '#797979',
  active: '#e10000',
};

export const SportsIcon = ({focused, uri}: {focused: boolean; uri: string}) => {
  return (
    <View style={sportsTabStyles.iconContainer}>
      <FastImage
        style={sportsTabStyles.icon}
        tintColor={focused ? sportsTabColors.active : sportsTabColors.inActive}
        source={{
          uri: uri,
        }}
      />
    </View>
  );
};
