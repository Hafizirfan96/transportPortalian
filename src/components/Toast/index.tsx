import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

const ToastMessage = (props: any) => {
  const styles = getStyles();
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        // style={{ borderLeftColor: 'pink' }}
        // contentContainerStyle={{ paddingHorizontal: 15 }}
        // text1Style={{
        //   fontSize: 15,
        //   fontWeight: '400',
        // }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 14,
          color: 'red',
        }}
        text2Style={{
          fontSize: 15,
          color: '#000',
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return (
    <View style={styles.container}>
      <Toast config={toastConfig} position="top" topOffset={20} />
    </View>
  );
};
const getStyles = () =>
  StyleSheet.create({
    container: {
      zIndex: 500,
    },
  });

export default ToastMessage;
