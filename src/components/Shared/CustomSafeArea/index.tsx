import React, { Fragment } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks';
import { useRoute } from '@react-navigation/native';
import { CustomSafeAreaType } from '@/interfaces/shared/CustomSafeAreaType';

//import HeaderErrorMessage from '@/Containers/HeaderErrorMessage'

const CustomSafeArea = (props: CustomSafeAreaType) => {
  const { Colors, darkMode } = useTheme();
  const route = useRoute();
  let topColor = Colors.primaryBackground;
  let bottomColor = Colors.lightGrey;

  //   switch (route.name.toLowerCase()) {
  //     case 'login':
  //       topColor = Colors.white
  //       bottomColor = Colors.primaryBackground
  //       break
  //     case 'filter':
  //     case 'teacherselector':
  //     case 'classlist':
  //       topColor = Colors.lightGrey
  //       bottomColor = darkMode ? Colors.primaryBackground : Colors.white
  //       break
  //     case 'messagedetails':
  //     case 'term':
  //       topColor = Colors.white
  //       bottomColor = darkMode ? Colors.success : Colors.white
  //       break
  //     case 'onboarding':
  //       topColor = Colors.lightBeige
  //       bottomColor = Colors.lightBeige
  //       break

  //     default:
  //       topColor = Colors.primaryBackground
  //       bottomColor = Colors.white
  //   }

  //   if (props.topColor) {
  //     topColor = props.topColor
  //   }

  //   if (props.bottomColor) {
  //     bottomColor = props.bottomColor
  //   }

  const styles = getStyles(topColor, bottomColor);
  return (
    <>
      <SafeAreaView style={styles.topArea} />
      <StatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.appColor}
      />
      {/* <HeaderErrorMessage /> */}
      <SafeAreaView
        style={[styles.bottomArea, { backgroundColor: Colors.background }]}
      >
        {props.children}
      </SafeAreaView>
    </>
  );
};

export default CustomSafeArea;

const getStyles = (topColor: string, bottomColor: string) =>
  StyleSheet.create({
    topArea: {
      flex: 0,
      backgroundColor: topColor,
    },
    bottomArea: {
      flex: 1,
      // backgroundColor: "white",
      //backgroundColor: 'red',
      //position: 'relative',
    },
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
  });
