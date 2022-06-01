import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {SportsTabBar} from './sports-bar/sports-bar';
import {SportsParams} from './sports-tab/sports-tab.interface';

const sports: SportsParams[] = [
  {
    id: '1',
    displayName: 'Cricket',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/cricket.png',
    slug: 'cricket',
  },
  {
    id: '2',
    displayName: 'Football',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/football.png',
    slug: 'football',
  },
  {
    id: '3',
    displayName: 'Basketball',
    iconUrl: 'https://s3.amazonaws.com/pwaimages/imgs/site-nba.png',
    slug: 'basketball',
  },
  {
    id: '4',
    displayName: 'Baseball',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/baseball.png',
    slug: 'baseball',
  },
  {
    id: '5',
    displayName: 'Hockey',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/hockey.png',
    slug: 'hockey',
  },
  {
    id: '6',
    displayName: 'Handball',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/handball.png',
    slug: 'handball',
  },
  {
    id: '7',
    displayName: 'Volleyball',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/volleyball.png',
    slug: 'volleyball',
  },
  {
    id: '8',
    displayName: 'F1',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/baseball.png',
    slug: 'f1',
  },
  {
    id: '9',
    displayName: 'Tennis',
    iconUrl: 'https://d11.s3.amazonaws.com/contain/sportsicons/baseball.png',
    slug: 'tennis',
  },
];

export const App = () => {
  const [state, setState] = useState(0);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{width: '100%'}}>
        <SportsTabBar
          onSportChange={() => {}}
          index={state}
          setIndex={index => {
            setState(index);
          }}
          sports={sports}
        />
      </View>
    </SafeAreaView>
  );
};
