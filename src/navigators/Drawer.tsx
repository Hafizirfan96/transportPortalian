import React from 'react';
import MainNavigator from './Main';
import useTheme from '@/hooks/useTheme';
import CustomDrawer from './CustomDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationScreen from '@/screens/NotificationScreen';

const Drawer = createDrawerNavigator();

// @refresh reset
const DrawerNavigator = () => {
  const { Colors, FontSize } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStatusBarAnimation: 'none',
        drawerType: 'front',
        headerShown: false,
        drawerStyle: {
          backgroundColor: Colors.primaryBackground,
          width: '70%',
        },
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: Colors.primaryTextColor,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 14,
          color: Colors.black,
          fontFamily: 'OsloSans-Bold',
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
        name="Notification"
        component={NotificationScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="notifications" size={22} color={Colors.black} />
          ),
          drawerLabel: 'Notification',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
