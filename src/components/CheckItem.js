import React, { useState, memo } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';

const CheckItem = props => {
  const { Layout, Colors } = useTheme();
  const [selected, SetSelected] = useState(props.value);

  const handleContainerClick = () => {
    if (
      props.isContainerClickable !== undefined &&
      props.isContainerClickable
    ) {
      props.onChangeValue(props.item, !selected);
    }

    SetSelected(!selected);
  };

  let colorActive =
    props.colorActive !== undefined
      ? props.colorActive
      : Colors.primaryTextColor;

  let colorInactive =
    props.colorInactive !== undefined ? props.colorInactive : '#000';

  let currentColor = selected ? colorActive : colorInactive;
  let currentIcon = selected ? 'check-box' : 'check-box-outline-blank';

  let { boxStyle, style } = props;
  const myconsole = () => console.log('rendering check item', selected);

  boxStyle = {
    color: currentColor,
    fontSize: wp(18),
    ...style,
  };
  return (
    <TouchableOpacity
      activeOpacity={props.isContainerClickable !== undefined ? 1.0 : 0.6}
      onPress={handleContainerClick}
      style={[Layout.row, Layout.rowHCenter]}
    >
      {myconsole()}
      <MaterialIcons name={currentIcon} style={[boxStyle]} />
    </TouchableOpacity>
  );
};

const propsAreEqual = (prev, next) => {
  return prev.value === next.value;
};
export default memo(CheckItem, propsAreEqual);
