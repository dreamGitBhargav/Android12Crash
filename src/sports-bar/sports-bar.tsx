import React, {memo, useCallback, useEffect, useRef, useState} from 'react';

import {
  Animated,
  Dimensions,
  Image,
  LayoutRectangle,
  NativeScrollEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SportsParams} from '../sports-tab/sports-tab.interface';
import {SportsIcon} from '../sports-tab/sports-tab-view';

const isIos = Platform.OS === 'ios';

export const sportsTabColors = {
  inActive: '#797979',
  active: '#e10000',
};

interface params {
  sports: SportsParams[];
  onSportChange: (sportSlug: string, sportId: string) => void;
  index: number;
  setIndex: (index: number) => void;
}

const INT_MAX = Number.MAX_SAFE_INTEGER;
const sportUnderLineWidth = 52;
export const SportsTabBar = memo(
  ({sports, onSportChange, index, setIndex}: params) => {
    const itemLayout = useRef<Record<string, LayoutRectangle>>({});
    const currentIndex = useRef<number>(index);
    const xPos = useRef(new Animated.Value(0)).current;
    const width = useRef(new Animated.Value(0)).current;
    const color = useRef(new Animated.Value(0)).current;
    const initialSet = useRef(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const currentLayout = itemLayout.current[index];
    const [scrollWidth, setScrollWidth] = useState(0);
    const screenWidth = Dimensions.get('window').width;
    const totalWidthIcons = useRef(0);
    const tab = useRef<LayoutRectangle[]>([]);
    const widthOfScreen = Dimensions.get('window').width;
    const [currentContentOffSet, setCurrentContentOffset] = useState<number>(0);
    const [showLeftArrowIcon, setShouldShowLeftArrowIcon] = useState(false);
    const [showRightArrowIcon, setShouldShowRightArrowIcon] = useState(true);

    const isCloseToEndOfScrollView = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }: NativeScrollEvent) => {
      return isIos
        ? layoutMeasurement.width + contentOffset.x >= contentSize.width - 2
        : layoutMeasurement.width + contentOffset.x >= contentSize.width;
    };

    const isCloseToStartOfScrollView = ({contentOffset}: NativeScrollEvent) => {
      return !isIos ? contentOffset.x === 0 : contentOffset.x <= 5;
    };

    useEffect(() => {
      if (currentLayout && !initialSet.current) {
        xPos.setValue(currentLayout?.x);
        width.setValue(currentLayout?.width);
        color.setValue(1);
        initialSet.current = true;
      }
    }, [index, color, xPos, currentLayout, width]);

    useEffect(() => {
      if (currentLayout?.x - 16 < screenWidth - scrollWidth) {
        scrollViewRef?.current?.scrollTo({x: 0, y: 0});
        return;
      }

      if (currentLayout?.x > screenWidth - sportUnderLineWidth - 16) {
        scrollViewRef?.current?.scrollToEnd();
      }
    }, [scrollWidth, currentLayout, screenWidth]);

    const firstVisibleIcon = (contentOffsetX: number) => {
      let minIndex = 0;
      let minDiff = INT_MAX;
      tab.current.forEach((value, i) => {
        if (Math.abs(contentOffsetX - value.x) < minDiff) {
          minDiff = Math.abs(contentOffsetX - value.x);
          minIndex = i;
        }
      });
      return minIndex;
    };

    const totalVisibleIcon = useCallback(() => {
      if (totalWidthIcons.current <= widthOfScreen) {
        return tab.current.length;
      } else {
        let x = widthOfScreen;
        let c = 0;
        tab.current.forEach(() => {
          if (x > sportUnderLineWidth) {
            c = c + 1;
            x = x - sportUnderLineWidth - 16;
          }
        });
        return c;
      }
    }, [totalWidthIcons, widthOfScreen]);

    const scrollToRight = (contentOffsetX: number, left: boolean) => {
      const firstVisibleIndex = firstVisibleIcon(contentOffsetX);
      const totalIconsVisible = totalVisibleIcon();

      if (!left) {
        const scrollToIcon =
          tab.current[firstVisibleIndex + Math.floor(totalIconsVisible / 2)];
        scrollViewRef?.current?.scrollTo({x: scrollToIcon.x, y: 0});
      } else {
        const indexToScroll =
          firstVisibleIndex - Math.floor(totalIconsVisible / 2);
        console.log(
          'indexToScroll',
          indexToScroll,
          tab.current[indexToScroll > 0 ? indexToScroll : 0].x,
        );
        const scrollToIcon = tab.current[indexToScroll > 0 ? indexToScroll : 0];
        scrollViewRef?.current?.scrollTo({
          x:
            scrollToIcon.x !== undefined || indexToScroll <= 0
              ? 0
              : scrollToIcon.x,
          y: 0,
        });
      }
    };

    useEffect(() => {
      if (currentIndex.current !== index) {
        currentIndex.current = index;
        const newLayout = itemLayout.current[index];

        color.setValue(0);

        if (newLayout) {
          width.stopAnimation();
          xPos.stopAnimation();
          color.stopAnimation();

          Animated.parallel([
            Animated.timing(width, {
              toValue: newLayout.width,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(xPos, {
              toValue: newLayout.x,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(color, {
              toValue: 1,
              duration: 250,
              useNativeDriver: false,
            }),
          ]).start();
        }
      }
    }, [index, color, xPos, width, currentLayout, scrollWidth, screenWidth]);

    return (
      <View style={[styles.container, styles.bottomBorderForMyMatches]}>
        <>
          {showLeftArrowIcon && isIos && (
            <TouchableWithoutFeedback
              onPress={() => {
                scrollToRight(currentContentOffSet, true);
                // e.of('sportsTabArrowsClicked').emit({direction: 'Left'});
              }}>
              <View style={styles.leftArrowStyle}>
                <Image
                  style={styles.arrowImage}
                  source={require('../sports-bar/assets/sports_selector_left_arrow.png')}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          {!showLeftArrowIcon && isIos && <View style={{width: 16}} />}
        </>
        <ScrollView
          horizontal
          ref={scrollViewRef}
          bounces={false}
          overScrollMode="never"
          alwaysBounceHorizontal={false}
          scrollEventThrottle={15}
          onScroll={({nativeEvent}) => {
            setCurrentContentOffset(nativeEvent.contentOffset.x);
            if (isCloseToEndOfScrollView(nativeEvent)) {
              setShouldShowRightArrowIcon(false);
            } else {
              setShouldShowRightArrowIcon(true);
            }

            if (isCloseToStartOfScrollView(nativeEvent)) {
              setShouldShowLeftArrowIcon(false);
            } else {
              setShouldShowLeftArrowIcon(true);
            }
          }}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollable}>
          {!isIos && <View style={{width: 8}} />}
          {sports.map((route, i) => {
            //const {options} = props.descriptors[route.key]
            const isFocused = index === i;
            //const iconExists = !!options.tabBarIcon

            const onPress = () => {
              console.log('----------');
              onSportChange(sports[i].slug, sports[i].id);
              if (!isFocused) {
                setIndex(i);

                const firstVisibleItem = firstVisibleIcon(currentContentOffSet);

                const totalIcons = totalVisibleIcon();

                if (firstVisibleItem === i) {
                  scrollToRight(currentContentOffSet, true);
                } else if (
                  firstVisibleItem + totalIcons - 1 === i &&
                  i !== sports.length
                ) {
                  scrollToRight(currentContentOffSet, false);
                }
              }
            };

            return (
              <Pressable
                style={[
                  isIos
                    ? i === 0
                      ? styles.sportLeftMostView
                      : i === sports.length - 1
                      ? styles.sportRighMostView
                      : styles.sportView
                    : styles.sportView,
                ]}
                key={route.id}
                onPress={onPress}
                onLayout={event => {
                  setScrollWidth(scrollWidth + event.nativeEvent.layout.width);
                  itemLayout.current[i] = event.nativeEvent.layout;
                  const layout = event.nativeEvent.layout;
                  tab.current[i] = layout;
                  totalWidthIcons.current =
                    totalWidthIcons.current + sportUnderLineWidth + 16;
                }}>
                <View style={styles.icon}>
                  <Animated.View style={StyleSheet.absoluteFill}>
                    {
                      <SportsIcon
                        focused={index === i}
                        uri={
                          // index === i ? route.selectedIconUrl : route.iconUrl
                          route.iconUrl
                        }
                      />
                    }
                  </Animated.View>
                </View>

                <Animated.Text
                  allowFontScaling={false}
                  style={[
                    styles.title,
                    {
                      color:
                        i === index
                          ? styles.itemActive.color
                          : styles.itemRegular.color,
                    },
                  ]}>
                  {route.displayName}
                </Animated.Text>
              </Pressable>
            );
          })}
          {!isIos && <View style={{width: 8}} />}
          <Animated.View
            style={[
              styles.indicator,
              {
                transform: [{translateX: xPos}],
              },
            ]}
          />
        </ScrollView>
        <>
          {showRightArrowIcon && isIos && (
            <TouchableWithoutFeedback
              onPress={() => {
                scrollToRight(currentContentOffSet, false);
                // e.of('sportsTabArrowsClicked').emit({direction: 'Right'});
              }}>
              <View style={styles.rightArrowShadow}>
                <Image
                  style={styles.arrowImage}
                  source={require('../sports-bar/assets/sports_selector_right_arrow.png')}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          {!showRightArrowIcon && isIos && <View style={{width: 16}} />}
        </>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  marginLeftArrow: {
    marginLeft: 16,
  },
  sportView: {
    borderColor: 'white',
    marginHorizontal: 8,
    width: sportUnderLineWidth,
  },
  sportLeftMostView: {
    borderColor: 'white',
    marginLeft: 0,
    marginRight: 8,
    width: sportUnderLineWidth,
  },
  sportRighMostView: {
    borderColor: 'white',
    marginLeft: 8,
    marginRight: 0,
    width: sportUnderLineWidth,
  },
  marginRightArrow: {
    marginRight: 16,
  },
  bottomBorderForMyMatches: {
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    elevation: 0,
    shadowOpacity: 0,
  },
  container: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    zIndex: 999,
  },
  scrollable: {
    flex: 1,
    height: 52,
  },
  icon: {
    marginTop: 8,
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 12,
    //marginHorizontal: 14,
    fontFamily: 'Roboto-Regular',
    marginTop: 4,
    // backgroundColor: 'red',
    textAlign: 'center',
  },
  itemRegular: {
    color: '#797979',
  },
  itemActive: {
    color: '#e10000',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 4,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: '#e10000',
    width: sportUnderLineWidth,
  },
  leftArrowStyle: {
    width: 16,
    height: 52,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a1a1a',
    shadowOffset: {width: 10, height: -10},
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
  rightArrowShadow: {
    width: 16,
    height: 52,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a1a1a',
    shadowOffset: {width: -10, height: 10},
    shadowOpacity: 0.12,
    shadowRadius: 20,
  },
  arrowImage: {
    width: 8,
    height: 24,
  },
});
