import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ToursScreen,
  DashboardScreen,
  VehiclesScreen,
  WorkloadScreen,
  NewWorkload,
} from '@/screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import useTheme from '@/hooks/useTheme';

const Tab = createBottomTabNavigator();

// @refresh reset
const MainNavigator = () => {
  const { Colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        borderTopColor: 'transparent',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize = focused ? 25 : size;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
            // return (
            //   <MaterialIcons name="dashboard" color={color} size={iconSize} />
            // );
          } else if (route.name === 'Tours') {
            iconName = focused ? 'ios-list-circle' : 'ios-list-circle-outline';
          } else if (route.name === 'Vehicles') {
            iconName = focused ? 'car-sport-sharp' : 'car-sport-outline';
          } else if (route.name === 'Workloads') {
            iconName = focused ? 'cube' : 'cube-outline';
          }

          return <Ionicons name={iconName} color={color} size={iconSize} />;
        },
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.grey,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.darkGrey,
          elevation: 0,
          height: 55,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        unmountOnBlur={true}
      />
      <Tab.Screen name="Tours" component={ToursScreen} />
      <Tab.Screen name="Vehicles" component={VehiclesScreen} />
      <Tab.Screen
        name="Workloads"
        component={WorkloadScreen}
        unmountOnBlur={true}
      />
      {/* <Tab.Screen name="NewWorkload" component={NewWorkload} /> */}
    </Tab.Navigator>
  );
};

export default MainNavigator;
