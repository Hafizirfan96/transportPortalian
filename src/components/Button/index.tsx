import React from 'react';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface IProps {
  handleSubmit?: () => void;
  title: string;
  backgroundColor?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}
const Button = ({
  title,
  handleSubmit,
  backgroundColor,
  isLoading,
}: IProps) => {
  const { Layout, Colors, Gutters, Fonts, Common } = useTheme();
  const styles = getStyle(Colors, backgroundColor);

  return (
    <TouchableOpacity
      style={[
        Gutters.regularTMargin,
        Gutters.smallHPadding,
        Gutters.tinyVPadding,
        Layout.alignSelfEnd,
        styles.submitButton,
      ]}
      onPress={handleSubmit}
      // disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          style={[Common.button.buttonText]}
          size="small"
          color={Colors.white}
        />
      ) : (
        <Text style={[Fonts.textSmallBold, styles.title]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
const getStyle = (Colors: any, backgroundColor: any) =>
  StyleSheet.create({
    submitButton: {
      borderRadius: wp(5),
      backgroundColor: backgroundColor
        ? Colors.emptyBorderColor
        : Colors.primaryBackground,
    },
    title: {
      color: backgroundColor ? Colors.schedul : Colors.black,
    },
  });
