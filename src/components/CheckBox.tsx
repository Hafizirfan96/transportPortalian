import React from 'react';
import { useTheme } from '@/hooks';
import { CheckBoxType } from '@/interfaces/shared/CheckBoxType';
import { SvgXml } from 'react-native-svg';
import { wp } from '@/utils/layout-scaling';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CheckBox(props: CheckBoxType) {
  const { Gutters, Images } = useTheme();

  let styles = props.disabled ? { opacity: 0.5 } : { opacity: 1 };

  if (props.addMarginRight) {
    styles = { ...styles, ...Gutters.regularRMargin };
  }

  return (
    <TouchableOpacity onPress={props.onPress}>
      <SvgXml
        xml={
          props.source
            ? props.source
            : props.checked
            ? Images.CheckBoxChecked
            : Images.CheckBoxUnChecked
        }
        width={wp(16)}
        height={wp(16)}
        style={styles}
      />
    </TouchableOpacity>
  );
}
