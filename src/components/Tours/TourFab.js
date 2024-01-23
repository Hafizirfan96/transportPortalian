import React, { useState, memo, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Button, Icon, Fab, Box } from 'native-base';
import { useTheme } from '@/hooks';
import { useSelector, useDispatch } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { wp, hp } from '@/utils/layout-scaling';

function TourFab(props) {
  const { Colors, Common } = useTheme();
  const [fabIcon, SetFabIcon] = useState(false);
  const styles = getStyles(Colors);

  let selectedTour = props.cardSelect.selected;

  //   const StartTour = () => {
  //     console.log('start workload')
  //     SetFabIcon(!fabIcon)
  //     props.startTour(selectedWorloads)
  //   }

  const EndTour = () => {
    console.log('End Tour');
    props.endTour(props.cardSelect.payload);
  };

  const openActionList = () => {
    console.log('Open action list');
    props.openAction();
  };

  const myconsole = () => console.log('rendering fab icon', selectedTour);
  return (
    <>
      {myconsole()}
      {!selectedTour ? (
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 20,
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
      ) : null}
    </>
  );
}
const getStyles = Colors =>
  StyleSheet.create({
    fabButton: {
      backgroundColor: Colors.appColor,
      bottom: 10,
    },
    fabIconStyle: {
      color: Colors.white,
      fontSize: hp(30),
    },
    buttonStyle: {
      color: Colors.appColor,
      fontSize: hp(30),
    },
    backgroundColorwhite: {
      backgroundColor: Colors.white,
    },
    backgroundcolor: {
      backgroundColor: '#fff',
    },
  });
export default TourFab;
