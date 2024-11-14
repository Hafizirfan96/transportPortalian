import React from 'react';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface inputModel {
  title?: string;
  isLoading?: boolean;
  bodyStyle?: StyleProp<ViewStyle>;
  textStyle?: TextStyle[];
  disabled?: boolean;
  handleSubmit?: () => void;
}
const AppButton = ({
  title,
  isLoading,
  handleSubmit,
  bodyStyle,
  textStyle,
  disabled,
}: inputModel) => {
  const { Layout, Colors, Common } = useTheme();
  const styles = getStyle();

  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={[
        Layout.row,
        Common.button.btnNormalSmall,
        styles.container,
        bodyStyle,
      ]}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          style={[Common.button.buttonText]}
          size="small"
          color={Colors.white}
        />
      ) : (
        <Text style={[Common.button.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
const getStyle = () =>
  StyleSheet.create({
    container: {
      height: wp(35),
    },
  });
