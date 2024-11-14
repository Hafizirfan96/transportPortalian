import { useTheme } from '@/hooks';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SortMenu = (props: any) => {
  const { Colors } = useTheme();

  return (
    <TouchableOpacity onPress={props.openSort}>
      <FontAwesome
        name="exchange"
        style={[{ transform: [{ rotate: '90deg' }] }]}
        size={18}
        color={Colors.primaryTextColor}
      />
    </TouchableOpacity>
  );
};

export default SortMenu;
