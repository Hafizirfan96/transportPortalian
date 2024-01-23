import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks';

const Mostusedof = props => {
  const { Layout, Fonts, Colors } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View style={[Layout.row, { marginTop: 15 }]}>
      <Text style={[Fonts.titleSmall, { flex: 1 }]}>Most Used</Text>
      <View style={[Layout.row, { alignContent: 'flex-end' }]}>
        <TouchableOpacity style={[styles.button]}>
          <Text style={{ marginTop: 5, textAlign: 'center' }}>OV6F</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Text style={{ marginTop: 5, textAlign: 'center' }}>OV6N</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]}>
          <Text style={{ marginLeft: 10, marginTop: 5, textAlign: 'center' }}>
            Sorting v...
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const getStyles = Colors =>
  StyleSheet.create({
    button: {
      width: 80,
      height: 30,
      backgroundColor: Colors.lightGreen,
      borderRadius: 30,
      marginRight: 5,
    },
  });
export default Mostusedof;
