import React from 'react';
import { useTheme } from '@/hooks';
import { SvgXml } from 'react-native-svg';
import { wp } from '@/utils/layout-scaling';
import { CheckBoxType } from '@/interfaces/shared/CheckBoxType';
import { Image, TouchableOpacity } from 'react-native';

export default function CheckBox(props: CheckBoxType) {
  const { Gutters, Images } = useTheme();

  let styles = props.disabled ? { opacity: 0.5 } : { opacity: 1 };

  if (props.addMarginRight) {
    styles = { ...styles, ...Gutters.smallRMargin };
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      {/* <SvgXml
        xml={props.checked ? Images.CheckBoxChecked : Images.CheckBoxUnChecked}
        width={wp(20)}
        height={wp(20)}
        style={styles}
      /> */}
      {props.checked ? (
        <Image source={Images.activeCheckBox} style={styles} />
      ) : (
        <Image source={Images.inActiveCheckBox} style={styles} />
      )}
    </TouchableOpacity>
  );
}
