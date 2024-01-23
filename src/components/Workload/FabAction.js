import React, { useState, memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';

function FabAction(props) {
  const { Colors, Common, Layout } = useTheme();

  // const StartWorkload = () => {
  //   console.log('start workload')
  //   SetFabIcon(!fabIcon)
  //   props.startWorkload(selectedWorloads)
  // }

  // const EndWorkload = () => {
  //   console.log('End workload')
  //   SetFabIcon(!fabIcon)
  //   props.endWorkload(selectedWorloads)
  // }

  const openActionList = () => {
    console.log('Open action list');
    //SetFabIcon(!fabIcon)
    props.openAction();
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        right: wp(20),
      }}
    >
      <TouchableOpacity
        onPress={openActionList}
        style={{
          backgroundColor: Colors.primaryBackground,
          width: wp(45),
          height: wp(45),
          borderRadius: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        activeOpacity={0.9}
      >
        <MaterialIcons
          name="add"
          style={{
            color: Colors.primaryTextColor,
            fontSize: wp(20),
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
const propsAreEqual = (prev, next) => {
  return prev.hasSelected === next.hasSelected;
};
export default memo(FabAction, propsAreEqual);
//export default FabAction
