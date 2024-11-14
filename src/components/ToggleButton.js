import React, { useState, memo, useEffect } from 'react';
import { useTheme } from '@/hooks';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { ThemeColors } from '@/Theme/theme.type';
import { wp } from '@/utils/layout-scaling';

const ToggleButton = ({ style, text, value, checked, onPress }) => {
  const { Fonts, Colors } = useTheme();
  const [selected, SetSelected] = useState(value || false);
  const styles = getStyles(Colors);
  let seclectedColor = Colors.primaryBackground;

  let unselectedColor = Colors.white;

  let textColorSelected = Colors.primaryTextColor;

  let textColorUnselected = Colors.primaryTextColor;

  let currentColor = selected ? seclectedColor : unselectedColor;
  let currentTextColor = selected ? textColorSelected : textColorUnselected;

  let boxStyle = {
    backgroundColor: currentColor,
    ...style,
  };
  let textStyle = {
    color: currentTextColor,
  };
  useEffect(() => {
    SetSelected(checked);
  }, [checked]);

  const handleContainerClick = () => {
    SetSelected(!selected);
    onPress(value, !selected);
  };

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, boxStyle]}
      onPress={handleContainerClick}
    >
      <Text style={[Fonts.textTinyBold, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const propsAreEqual = (prev, next) => {
  return prev.value === next.value;
};
//export default memo(ToggleButton, propsAreEqual)
export default ToggleButton;
const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    ItemWrapper: {
      paddingTop: wp(10),
      paddingBottom: wp(10),
      left: wp(6),
    },
    buttonContainer: {
      backgroundColor: Colors.white,
      paddingHorizontal: wp(11),
      paddingVertical: wp(7),
      borderRadius: wp(5),
      marginRight: wp(6),
    },
  });
