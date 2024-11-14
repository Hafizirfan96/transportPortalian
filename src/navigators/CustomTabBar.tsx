import React from 'react';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  const styles = getStyle();

  return (
    <View style={styles.tabsContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[
              styles.tab,
              //  { borderWidth: 1 }
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                isFocused && styles.iconContainerFocused,
              ]}
            >
              <Image
                source={options.tabBarIcon as ImageSourcePropType}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.tabLabel}>
              {options.tabBarLabel
                ? (options.tabBarLabel as string)
                : route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const getStyle = () => {
  const { Colors, Layout, Fonts, Gutters } = useTheme();
  return StyleSheet.create({
    tabsContainer: {
      ...Layout.row,
      ...Layout.justifyContentEvenly,
      backgroundColor: Colors.white,
    },
    tab: {
      height: wp(55),
      ...Layout.alignItemsCenter,
      ...Gutters.smallTMargin,
    },
    iconContainer: {
      height: wp(30),
      width: wp(40),
      ...Layout.alignItemsCenter,
      ...Layout.justifyContentCenter,
    },
    iconContainerFocused: {
      backgroundColor: Colors.primaryBackground,
      borderRadius: wp(20),
    },
    icon: {
      width: wp(20),
      height: wp(20),
    },
    tabLabel: {
      ...Fonts.textMedium,
      lineHeight: wp(20),
    },
  });
};

export default CustomTabBar;
