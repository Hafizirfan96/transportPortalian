import React from 'react';
import { Text, View, Keyboard } from 'react-native';
import { Header, NewWorkloadComponents } from '@/components';
import { useTheme } from '@/hooks';

const NewWorkload = () => {
  const { Colors, Common, Layout, Images } = useTheme();
  return (
    <View onPress={Keyboard.dismiss} style={[Layout.fill]}>
      <Header backPage="workload" />
      <NewWorkloadComponents />
    </View>
  );
};
export default NewWorkload;
