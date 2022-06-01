import {StyleSheet} from 'react-native';

export const sportsTabColors = {
  inActive: '#797979',
  active: '#e10000',
};

export const sportsTabStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconInActive: {
    width: 20,
    height: 20,
    tintColor: '#797979',
  },
  iconActive: {
    width: 20,
    height: 20,
    tintColor: '#e10000',
  },
  label: {
    textTransform: 'none',
    fontSize: 10,
    lineHeight: 12,
  },
  indicator: {
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    width: 52,
    height: 4,
    marginLeft: 8,
    backgroundColor: sportsTabColors.active,
  },
  tab: {
    width: 68,
    height: 52,
    padding: 0,
  },
  iconMargin: {
    marginBottom: -8,
    marginTop: 4,
  },
});
