import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import { Config } from '@/Config';
import RadioButtonWithText from '../RadioButtonWithText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { wp } from '@/utils/layout-scaling';
import { ThemeColors } from '@/Theme/theme.type';
import { navigate } from '@/navigators/Root';

function TourFebAction(props: any, ref: any) {
  const { Colors, Fonts, Layout, Gutters } = useTheme();
  const styles = getStyles(Colors, Gutters);
  const modalizeRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      modalizeRef.current?.open();
    },
  }));
  const handleSortToggle = (item: any) => {
    console.log('handleSortToggle', item);
    // SetSort(item.Id)
    // props.onSelected(item)
    // modalizeRef.current?.close()
  };
  const _handleStartWorkload = () => {
    console.log('Start workload pressed');
    // props.startWorkload();
    // navigate('NewWorkload');

    modalizeRef.current?.close();
  };
  const _handleEndWorkload = () => {
    console.log('End workload pressed');
    props.endWorkload();
    modalizeRef.current?.close();
  };
  const handleNavigation = () => {
    console.log('new workload');
    navigate('NewTour');
  };
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={true}
      withHandle={false}
      avoidKeyboardLikeIOS={true}
    >
      <View style={[Layout.column, Gutters.mediumPadding]}>
        <View style={[Layout.row, Gutters.smallVMargin]}>
          <TouchableOpacity
            onPress={() => console.log('press 1')}
            disabled={true}
            style={[Layout.center, Layout.fill]}
          >
            <MaterialIcons name="edit" style={[styles.ActionIcon]} />
            <Text style={[Fonts.textTiny]}>Product List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNavigation}
            style={[Layout.center, Layout.fill]}
          >
            <Fontisto name="export" style={[styles.ActionIcon]} />
            <Text style={[Fonts.textTiny]}>New Tour</Text>
            {/* <Text style={[Fonts.textTiny]}>New Workload</Text> */}
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={_handleEndWorkload}
            style={[Layout.center, Layout.fill]}
          >
            <Fontisto name="import" style={[styles.ActionIcon]} />
            <Text style={[Fonts.textTiny]}>End</Text>
          </TouchableOpacity> */}
        </View>
        <View
          style={[
            Layout.row,
            Layout.justifyContentBetween,
            Gutters.smallVMargin,
          ]}
        >
          <TouchableOpacity
            onPress={() => console.log('press 1')}
            style={[Layout.center, Layout.fill]}
            disabled={true}
          >
            <MaterialIcons name="delete-forever" style={[styles.ActionIcon]} />
            <Text style={[Fonts.textTiny]}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={_handleStartWorkload}
            style={[Layout.center, Layout.fill]}
          >
            <Fontisto name="map-marker-alt" style={[styles.ActionIcon]} />
            <Text style={[Fonts.textTiny]}>Added Workloads</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modalize>
  );
}

const getStyles = (colors: ThemeColors, gutters: any) =>
  StyleSheet.create({
    ActionIcon: {
      color: colors.primaryTextColor,
      fontSize: wp(25),
      alignSelf: 'center',
      ...gutters.tinyBMargin,
    },
  });

export default forwardRef(TourFebAction);
