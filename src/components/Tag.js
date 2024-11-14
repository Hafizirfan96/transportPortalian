import React from 'react';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import { StyleSheet, Text, View } from 'react-native';

const Tag = props => {
  const { Colors, Gutters } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View style={[styles.button, Gutters.tinyTMargin]}>
      <Text style={[styles.textstyle]}>{props.text}</Text>
    </View>
  );
};
const getStyles = colors =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.backgroundColor,
      borderColor: colors.primaryTextColor,
      borderWidth: wp(1),
      borderRadius: wp(16),
      marginRight: wp(5),
    },
    textstyle: {
      paddingHorizontal: wp(6),
      paddingVertical: wp(3),
      fontSize: wp(11),
      color: colors.black,
    },
  });
export default Tag;
