import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks';

const Endworkloadtab = () => {
  const { Layout, Colors, Fonts } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View style={[Layout.row]}>
      <TouchableOpacity style={styles.button1}>
        <Text style={[Fonts.titleRegular, styles.textstyle1]}>
          End Workload
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={[Fonts.textRegular, styles.textstyle2]}>
          Product History
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    button1: {
      borderTopWidth: 4,
      width: '50%',
      borderTopColor: Colors.appColor,
      paddingTop: 5,
    },
    button2: {
      borderTopWidth: 4,
      width: '50%',
      borderTopColor: 'white',
      paddingTop: 5,
    },
    textstyle1: {
      textAlign: 'center',
      color: Colors.appColor,
    },
    textstyle2: {
      textAlign: 'center',
      color: Colors.lightGreen,
    },
  });
export default Endworkloadtab;
