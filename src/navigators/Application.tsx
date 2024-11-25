import React from 'react';
import DrawerNavigator from './Drawer';
import useTheme from '@/hooks/useTheme';
import { navigationRef } from '@/navigators/Root';
import { StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Service,
  NewTour,
  NewWorkload,
  LoginScreen,
  ShiftDetails,
  MapboxScreen,
  EndTourScreen,
  ResetPassword,
  DamageGallery,
  RouteOptimize,
  ExternalLinks,
  ForgotPassword,
  SignatureScreen,
  WorkloadEndScreen,
  RegisterNewDamage,
  VehicleInspection,
  BarcodeScaneScreen,
  NewWorkloadShipment,
  VehicleDetailScreen,
  IndexStartupContainer,
  CaptureSignatureScreen,
  EndworkloadProductHistory,
  EndTourAndWorkloadHistory,
} from '@/screens';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme, Colors } = useTheme();
  const styles = getStyles(Colors);

  return (
    <SafeAreaProvider style={[Layout.fill, styles.container]}>
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'light-content'} />
        <Stack.Navigator
          initialRouteName="Startup"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Startup" component={IndexStartupContainer} />
          <Stack.Screen name="Login" component={LoginScreen} />

          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{
              animationEnabled: false,
            }}
          />

          <Stack.Screen
            name="VehicleInspection"
            component={VehicleInspection}
          />
          <Stack.Screen
            name="RegisterNewDamage"
            component={RegisterNewDamage}
          />
          <Stack.Screen name="NewTour" component={NewTour} />
          <Stack.Screen
            name="NewWorkloadShipment"
            component={NewWorkloadShipment}
          />
          <Stack.Screen
            name="EndworkloadProductHistory"
            component={EndworkloadProductHistory}
          />
          <Stack.Screen
            name="EndTourAndWorkloadHistory"
            component={EndTourAndWorkloadHistory}
          />
          <Stack.Screen name="Service" component={Service} />
          <Stack.Screen name="DamageGallery" component={DamageGallery} />
          <Stack.Screen name="ShiftDetails" component={ShiftDetails} />
          <Stack.Screen name="WorkloadEnd" component={WorkloadEndScreen} />
          <Stack.Screen name="VehicleDetail" component={VehicleDetailScreen} />
          <Stack.Screen name="EndTour" component={EndTourScreen} />
          <Stack.Screen name="Signature" component={SignatureScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen
            name="CaptureSignature"
            component={CaptureSignatureScreen}
          />
          <Stack.Screen name="BarcodeScane" component={BarcodeScaneScreen} />
          <Stack.Screen name="NewWorkload" component={NewWorkload} />
          <Stack.Screen name="MapboxScreen" component={MapboxScreen} />
          <Stack.Screen name="ExternalLinks" component={ExternalLinks} />
          <Stack.Screen name="RouteOptimize" component={RouteOptimize} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
  });
export default ApplicationNavigator;
