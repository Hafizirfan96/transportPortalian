import React from 'react';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CheckItem = (props: any) => {
  const { Layout, Colors } = useTheme();

  const handleContainerClick = () => {
    if (
      props.isContainerClickable !== undefined &&
      props.isContainerClickable
    ) {
      props.onChangeValue(props.item, !props.value);
    }
  };

  const colorActive =
    props.colorActive !== undefined
      ? props.colorActive
      : Colors.primaryTextColor;

  const colorInactive =
    props.colorInactive !== undefined ? props.colorInactive : Colors.black;

  let { boxStyle, style } = props;

  boxStyle = {
    color: props.value ? colorActive : colorInactive,
    fontSize: wp(18),
    ...style,
  };

  return (
    <TouchableOpacity
      activeOpacity={props.isContainerClickable !== undefined ? 1.0 : 0.6}
      onPress={handleContainerClick}
      style={[Layout.row, Layout.rowHCenter]}
    >
      {props.Icon ? (
        props.Icon
      ) : (
        <MaterialIcons name={'check-box'} style={[boxStyle]} />
      )}
      {props.component}
    </TouchableOpacity>
  );
};

export default CheckItem;
