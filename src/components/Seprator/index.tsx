import React from 'react';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import { StyleSheet, View } from 'react-native';

const Seprator = () => {
  const { Colors } = useTheme();
  const styles = getStyle(Colors);

  return <View style={[styles.container]} />;
};

const getStyle = (Colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.emptyBorderColor,
      height: wp(2),
    },
  });
export default Seprator;
