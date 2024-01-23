import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';

const Tag = props => {
  const { Fonts, Colors } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View style={[styles.button]}>
      <Text style={[Fonts.textTiny, styles.textstyle]}>{props.text}</Text>
    </View>
  );
};
const getStyles = colors =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.primaryBackground,
      borderColor: colors.primaryTextColor,
      borderWidth: 1,
      borderRadius: wp(16),
      marginRight: wp(10),
      marginBottom: wp(10),
    },
    textstyle: {
      textAlign: 'center',
      paddingHorizontal: wp(10),
      paddingVertical: wp(8),
    },
  });
export default Tag;
