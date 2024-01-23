import React, { useState, memo, useEffect } from 'react';
import { useTheme } from '@/hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

const ToggleButton = ({ style, text, value, checked, onPress }) => {
  const { Fonts, Layout, Common, Colors } = useTheme();
  const [selected, SetSelected] = useState(false);

  let seclectedColor = Colors.primaryBackground;

  let unselectedColor = Colors.white;

  let textColorSelected = Colors.primaryTextColor;

  let textColorUnselected = Colors.primaryTextColor;

  let currentColor = selected ? seclectedColor : unselectedColor;
  let currentTextColor = selected ? textColorSelected : textColorUnselected;

  const myconsole = () => console.log('rendering toggle button');
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
      style={[Common.button.btnWhiteSmall, Common.card, boxStyle]}
      onPress={handleContainerClick}
    >
      <View style={[Layout.fill, Layout.center]}>
        <Text style={[Fonts.textTiny, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const propsAreEqual = (prev, next) => {
  return prev.value === next.value;
};
//export default memo(ToggleButton, propsAreEqual)
export default ToggleButton;
