import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  ToursScreen,
  DashboardScreen,
  VehiclesScreen,
  WorkloadScreen,
  NewWorkload,
} from '@/screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import useTheme from '@/hooks/useTheme';
import CustomDrawer from './CustomDrawer';
import MainNavigator from './Main';

const Drawer = createDrawerNavigator();

// @refresh reset
const DrawerNavigator = () => {
  const { Colors, Gutters, FontSize } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.primaryBackground,
          width: '70%',
        },
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: Colors.primaryTextColor,
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'oslosans-medium',
          fontSize: FontSize.small,
        },
      }}
      initialRouteName="MainDrawer"
    >
      <Drawer.Screen
        name="MainDrawer"
        component={MainNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="dashboard" size={22} color={color} />
          ),
          drawerLabel: 'Dashboard',
        }}
      />

      <Drawer.Screen
        name="Tours"
        component={ToursScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="tour" size={22} color={color} />
          ),
          drawerLabel: 'Tours',
        }}
      />
      <Drawer.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="car" size={22} color={color} />
          ),
          drawerLabel: 'Vehicles',
        }}
      />
      <Drawer.Screen
        name="Workloads"
        component={WorkloadScreen}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="assignment" size={22} color={color} />
          ),
          drawerLabel: 'Workloads',
        }}
      />
      {/* <Drawer.Screen
        name="Tours"
        component={TourStack}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="tour" size={22} color={color} />
          ),
          drawerLabel: 'Tours',
        }}
      />
      <Drawer.Screen
        name="Vehicles"
        component={VehicleStack}
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="car" size={22} color={color} />
          ),
          drawerLabel: 'Vehicles',
        }}
      />

      <Drawer.Screen
        name="Workloads"
        component={WorkloadStack}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialIcons name="assignment" size={22} color={color} />
          ),
          drawerLabel: 'Workloads',
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
