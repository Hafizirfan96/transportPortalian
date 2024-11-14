import React from 'react';
import { useTheme } from '@/hooks';
import {
  Keyboard,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import { hp, wp } from '@/utils/layout-scaling';

interface inputModel {
  icon?: React.ReactNode;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  onBlur?: () => void;
  isPassword?: boolean;
  keyboardType?: boolean;
  outerStyle?: any;
  innerStyle?: any;
  reference?: any;
  rightIcon?: React.ReactNode;
  validationComponent?: React.ReactNode;
  onSubmitEditing?: () => void;
  style?: StyleProp<TextStyle>;
  defaultValue?: string;
}
const Input = (props: inputModel) => {
  const { Layout, Colors, Gutters, Fonts } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View>
      <View
        style={[
          styles.textContainer,
          Layout.row,
          Layout.center,
          Gutters.tinyPadding,
          Gutters.smallVPadding,
          !props ? Gutters.regularTMargin : null,
          Platform.OS == 'ios' ? Gutters.smallVPadding : Gutters.tinyVPadding,
          props.outerStyle,
        ]}
      >
        {props.icon && props.icon}

        <TextInput
          style={[
            styles.textMessageInput,
            Gutters.smallPadding,
            Layout.fill,
            Fonts.textNormal,
            props.innerStyle,
          ]}
          onSubmitEditing={() => {
            props.onSubmitEditing && props.onSubmitEditing();
            Keyboard.dismiss();
          }}
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
          defaultValue={props.defaultValue}
        />

        {props.rightIcon && props.rightIcon}
      </View>
      {props.validationComponent && (
        <View style={[styles.validation]}>{props.validationComponent}</View>
      )}
    </View>
  );
};

export default Input;

export const getStyles = (colors: any) => {
  var styles = StyleSheet.create({
    textContainer: {
      height: wp(40),
      backgroundColor: colors.white,
      borderRadius: wp(5),
      elevation: wp(5),
      shadowColor: colors.black,
    },
    textMessageInput: {
      height: Platform.OS == 'ios' ? wp(25) : wp(37),
    },
    validation: {
      marginLeft: wp(1),
      marginTop: hp(3),
    },
  });

  return styles;
};
