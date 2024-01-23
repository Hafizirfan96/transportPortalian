import React from 'react';
import { useTheme } from '@/hooks';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { wp } from '@/utils/layout-scaling';

interface inputModel {
  icon?: any;
  placeholder: string;
  onChangeText: (val: string) => void;
  value: string;
  onBlur: () => void;
  isPassword?: boolean;
  keyboardType: any;
}
const Input = (props: inputModel) => {
  const { Layout, Colors, Gutters, Fonts } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View
      style={[
        styles.textContainer,
        Layout.row,
        Layout.center,
        Gutters.tinyPadding,
        // Gutters.smallLPadding,
        Gutters.smallVPadding,
        Gutters.mediumBMargin,
        Platform.OS == 'ios' ? Gutters.smallVPadding : Gutters.tinyVPadding,
      ]}
    >
      {props.icon}

      <TextInput
        style={[styles.textMessageInput, Gutters.smallPadding, Layout.fill]}
        placeholder={props.placeholder}
        placeholderTextColor={Colors.placeHolderColor}
        underlineColorAndroid="transparent"
        autoCorrect={false}
        onChangeText={props.onChangeText}
        blurOnSubmit={false}
        value={props.value}
        onBlur={props.onBlur}
        secureTextEntry={props.isPassword}
        keyboardType={props.keyboardType ? 'numeric' : null}
      />
    </View>
  );
};

export default Input;

export const getStyles = (colors: any) => {
  var styles = StyleSheet.create({
    textContainer: {
      backgroundColor: colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: colors.black,
      width: '97%',
      left: wp(5),
    },
    textMessageInput: {
      height: Platform.OS == 'ios' ? wp(25) : wp(35),
      fontSize: wp(12),
      fontFamily: 'OsloSans-Bold',
    },
  });

  return styles;
};
