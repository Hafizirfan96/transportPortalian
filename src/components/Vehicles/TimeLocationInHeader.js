import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks';

const TimeLocationInHeader = () => {
  const { Images, Layout, Colors } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View style={[Layout.row, Layout.justifyContentBetween, styles.container]}>
      <View style={Layout.row}>
        <Image source={Images.locatIcon} style={styles.iconStyle} />
        <Text style={styles.textStyle}>Location</Text>
      </View>
      <View style={Layout.row}>
        <Image source={Images.timeIcon} style={styles.iconStyle} />
        <Text style={styles.textStyle}>Time</Text>
      </View>
    </View>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    container: {
      marginTop: -28,
      marginBottom: 7,
    },
    iconStyle: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
      margin: 3,
    },
    textStyle: {
      color: Colors.white,
      fontFamily: 'OsloSans-Bold',
    },
  });
export default TimeLocationInHeader;
