import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  IndexStartupContainer,
  LoginScreen,
  WorkloadEndScreen,
  VehicleDetailScreen,
  VehicleInspection,
  EndTourScreen,
  SignatureScreen,
  CaptureSignatureScreen,
  BarcodeScaneScreen,
  NewWorkload,
  RegisterNewDamage,
  Service,
  ForgotPassword,
  ResetPassword,
  ShiftDetails,
  NewTour,
  NewWorkloadShipment,
  EndworkloadProductHistory,
  EndTourAndWorkloadHistory,
} from '@/screens';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/navigators/Root';
import { StatusBar, StyleSheet } from 'react-native';
import { useFlipper } from '@react-navigation/devtools';

import useTheme from '@/hooks/useTheme';
import DrawerNavigator from './Drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

//let MainNavigator;

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme, Colors } = useTheme();
  const styles = getStyles(Colors);

  // const [isApplicationLoaded, setIsApplicationLoaded] = useState(false);
  // const applicationIsLoading = useSelector(state => {
  //   return state.startup.isAuthenticated;
  // });

  // useEffect(() => {
  //   if (MainNavigator == null && !applicationIsLoading) {
  //     MainNavigator = require('@/navigators/Main').default;
  //     setIsApplicationLoaded(true);
  //   }
  // }, [applicationIsLoading]);

  // on destroy needed to be able to reset when app close in background (Android)
  // useEffect(
  //   () => () => {
  //     setIsApplicationLoaded(false);
  //     MainNavigator = null;
  //   },
  //   [],
  // );
  useFlipper(navigationRef);

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

          {/* {isApplicationLoaded && MainNavigator != null && (
          <> */}
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          {/* <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            /> */}
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
