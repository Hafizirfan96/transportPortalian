import React from 'react';
import useTheme from '@/hooks/useTheme';
import CustomTabBar from './CustomTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  ToursScreen,
  DashboardScreen,
  VehiclesScreen,
  WorkloadScreen,
  MapboxScreen,
} from '@/screens';

const { Navigator, Screen } = createBottomTabNavigator();

const MainNavigator = () => {
  const { Images } = useTheme();

  return (
    <Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
    >
      <Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarIcon: Images.dashboard }}
      />
      <Screen
        name="Tours"
        component={ToursScreen}
        options={{ tabBarIcon: Images.tour }}
      />
      <Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{ tabBarIcon: Images.vehicle }}
      />
      <Screen
        name="Workloads"
        component={WorkloadScreen}
        options={{ tabBarIcon: Images.workload }}
      />
      <Screen
        name="Map"
        component={MapboxScreen}
        options={{ tabBarIcon: Images.mapTabLocation }}
      />
    </Navigator>
  );
};

export default MainNavigator;
