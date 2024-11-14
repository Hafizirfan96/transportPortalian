import React from 'react';
import { useTheme } from '@/hooks';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { wp } from '@/utils/layout-scaling';
import { ThemeColors } from '@/Theme/theme.type';

const EmptyList = (props: any) => {
  const { Gutters, Fonts, Colors, Images, Layout } = useTheme();
  const styles = getStyle(Colors);

  return (
    <View
      style={[
        Layout.alignItemsCenter,
        Gutters.mediumHMargin,
        Layout.row,
        styles.container,
      ]}
    >
      <Image source={Images.alret} style={{ width: wp(17), height: wp(14) }} />
      <Text
        style={[Fonts.textSmall, Gutters.smallLMargin, { color: Colors.red }]}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default EmptyList;
const getStyle = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderColor: Colors.emptyBorderColor,
      borderBottomWidth: wp(1),
      borderTopWidth: wp(1),
      height: wp(44),
    },
  });
