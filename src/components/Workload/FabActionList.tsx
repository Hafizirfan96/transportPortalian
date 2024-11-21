import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppSelector, useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import { Config } from '@/config';
import RadioButtonWithText from '../RadioButtonWithText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { wp } from '@/utils/layout-scaling';
import { ThemeColors } from '@/Theme/theme.type';
import { navigate } from '@/navigators/Root';
import { workloadSelector } from '@/store/workload';
import { useFocusEffect } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

function FabActionList(props: any, ref: any) {
  const { selectedItemsIndexs, hasNewItems } = useAppSelector(workloadSelector);
  const { Colors, Fonts, Layout, Gutters, Images } = useTheme();
  const styles = getStyles(Colors, Gutters);
  // const [start, setStart] = useState(false);
  const modalizeRef = useRef(null);

  const showButton = selectedItemsIndexs.length > 0;
  // const checkWorkload = () => {
  //   console.log('called');
  //   let newStatusArray = selectedItemsIndexs.map((x: any) => {
  //     if (workloadData[x].Status === Config.WORKLOAD_STATUS.NEW) {
  //       return x;
  //     }
  //   });
  //   if (newStatusArray.length > 0) {
  //     setStart(true);
  //   } else {
  //     setStart(false);
  //   }
  // };

  // useEffect(() => {
  //   checkWorkload();
  // });
  // const end = selectedItems.every(
  //   x => x.Status === Config.WORKLOAD_STATUS.STARTED,
  // );
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
    props.startWorkload();
    modalizeRef.current?.close();
  };
  const _handleEndWorkload = () => {
    props.endWorkload();
    modalizeRef.current?.close();
  };
  const _handleNewWorkload = () => {
    navigate('NewWorkloadShipment');
    modalizeRef.current?.close();
  };

  const _deleteWorkload = () => {
    props.deleteWorkload();
    modalizeRef.current?.close();
  };

  const navigateToMapScreen = (item: any) => {
    navigate('MapboxScreen', props);
  };
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight={true}
      withHandle={false}
      avoidKeyboardLikeIOS={true}
    >
      <View style={[Layout.column, Gutters.mediumHPadding]}>
        <View style={[Layout.row, Gutters.smallVMargin]}>
          {!showButton ? (
            <>
              <TouchableOpacity
                onPress={_handleNewWorkload}
                // disabled={true}
                style={[Layout.center, Layout.fill]}
              >
                <SvgXml
                  xml={Images.newWorkload}
                  height={wp(19)}
                  width={wp(20)}
                />
                <Text style={[Fonts.textTiny, styles.text]}>New Workload</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // disabled={true}
                style={[Layout.center, Layout.fill, styles.borders]}
              >
                {/* <FontAwesome5 name="table-list" style={[styles.ActionIcon]} /> */}
                <SvgXml
                  xml={Images.productList}
                  height={wp(20)}
                  width={wp(20)}
                />
                <Text style={[Fonts.textTiny, styles.text]}>Product List</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // disabled={true}
                style={[Layout.center, Layout.fill]}
              >
                <SvgXml xml={Images.routes} height={wp(20)} width={wp(20)} />
                <Text style={[Fonts.textTiny, styles.text]}>
                  Optimmize Route
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* <TouchableOpacity
                onPress={() => console.log('press 1')}
                // disabled={true}
                style={[Layout.center, Layout.fill]}
              >
                <MaterialIcons name="edit" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny]}>Edit</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={_handleNewWorkload}
                // disabled={true}
                style={[Layout.center, Layout.fill]}
              >
                <MaterialIcons name="work" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny]}>New Workload</Text>
              </TouchableOpacity>
              {hasNewItems && (
                <TouchableOpacity
                  onPress={_handleStartWorkload}
                  style={[Layout.center, Layout.fill]}
                >
                  <Fontisto name="export" style={[styles.ActionIcon]} />
                  <Text style={[Fonts.textTiny]}>Start</Text>
                </TouchableOpacity>
              )}
              <>
                <TouchableOpacity
                  onPress={_handleEndWorkload}
                  style={[Layout.center, Layout.fill]}
                >
                  <Fontisto name="import" style={[styles.ActionIcon]} />
                  <Text style={[Fonts.textTiny]}>End</Text>
                </TouchableOpacity>
              </>
            </>
          )}
        </View>
        {!showButton ? (
          <></>
        ) : (
          <>
            <View
              style={[
                Layout.row,
                Layout.justifyContentBetween,
                Gutters.smallVMargin,
              ]}
            >
              <TouchableOpacity
                onPress={_deleteWorkload}
                style={[Layout.center, Layout.fill]}
              >
                <MaterialIcons
                  name="delete-forever"
                  style={[styles.ActionIcon]}
                />
                <Text style={[Fonts.textTiny, styles.text]}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={item => navigateToMapScreen(item)}
                style={[Layout.center, Layout.fill]}
              >
                <Fontisto name="map-marker-alt" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny, styles.text]}>Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('press 1')}
                style={[Layout.center, Layout.fill]}
              >
                <MaterialIcons name="message" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny, styles.text]}>Message</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    borders: {
      borderLeftWidth: wp(1),
      borderRightWidth: wp(1),
      // marginHorizontal: wp(2),
    },
    text: {
      width: wp(70),
      textAlign: 'center',
      marginTop: wp(5),
    },
  });

export default forwardRef(FabActionList);
