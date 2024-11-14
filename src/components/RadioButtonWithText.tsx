import React from 'react';
import { useTheme } from '@/hooks';
import { SvgXml } from 'react-native-svg';
import { RadioButtonWithTextType } from '@/Interfaces/Shared/RadioButtonWithTextType';
import { wp } from '@/utils/layout-scaling';
import { Text, TouchableOpacity } from 'react-native';

const RadioButtonWithText = (props: RadioButtonWithTextType) => {
  // console.log('props in radio', props);
  const { Gutters, Layout, Images, Fonts } = useTheme();
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel={props.text}
      accessibilityRole={'radio'}
      style={[Layout.row, Layout.fill, Layout.alignItemsCenter]}
      onPress={props.onCheck}
      activeOpacity={0.8}
    >
      <SvgXml
        xml={
          props.isChecked ? Images.RadioButtonCheck : Images.RadioButtonUnCheck
        }
        width={wp(16)}
        height={wp(16)}
        style={[Gutters.smallRMargin]}
      />
      <Text style={[Fonts.textTiny]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default RadioButtonWithText;
