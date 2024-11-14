import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, {
  BaseToast,
  ErrorToast,
  SuccessToast,
} from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Workload/WorkloadItem/style';
import { FontSize } from '../../theme/Variables';
import { showToast } from '@/store/appState';

const ToastMessage = (props: any) => {
  const styles = getStyles();
  const dispatch = useDispatch();
  const toastMessage = useSelector((state: any) => state.appState.toastMessage);
  useEffect(() => {
    if (toastMessage) {
      Toast.show({
        type: toastMessage.type,
        text1: toastMessage.text1,
        text2: toastMessage.text2,
        autoHide: true,
        onHide: () => dispatch(showToast(null)), // Clear the toast message when it's hidden
      });
    }
  }, [toastMessage, dispatch]);
  const toastConfig = {
    success: (props: any) => (
      <SuccessToast
        {...props}
        text1Style={{
          fontSize: 15,
          color: 'green',
        }}
        text2Style={styles.text2Error}
        text2NumberOfLines={10}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        text1Style={styles.textError}
        text2Style={styles.text2Error}
        text2NumberOfLines={10}
      />
    ),
    tomatoToast: ({ text1, props }: any) => (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  return (
    <View style={styles.container}>
      <Toast config={toastConfig} position="top" topOffset={10} />
    </View>
  );
};
const getStyles = () =>
  StyleSheet.create({
    container: {
      zIndex: 500,
    },
    text2Error: {
      fontSize: 15,
      color: '#000',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
    },
    textError: {
      fontSize: 14,
      color: 'red',
    },
  });

export default ToastMessage;
