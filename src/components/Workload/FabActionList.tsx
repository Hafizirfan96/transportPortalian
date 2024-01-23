import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@/hooks';
import { Modalize } from 'react-native-modalize';
import { Config } from '@/config';
import RadioButtonWithText from '../RadioButtonWithText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { wp } from '@/utils/layout-scaling';
import { ThemeColors } from '@/Theme/theme.type';
import { navigate } from '@/navigators/Root';

function FabActionList(props: any, ref: any) {
  const { Colors, Fonts, Layout, Gutters } = useTheme();
  const styles = getStyles(Colors, Gutters);
  const modalizeRef = useRef(null);

  const showButton = props.selectedWorloads.length > 0;

  const start = props.selectedWorloads.every(
    x => x.Status === Config.WORKLOAD_STATUS.NEW,
  );
  const end = props.selectedWorloads.every(
    x => x.Status === Config.WORKLOAD_STATUS.STARTED,
  );
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
    props.startWorkload();
    modalizeRef.current?.close();
  };
  const _handleEndWorkload = () => {
    console.log('End workload pressed');
    props.endWorkload();
    modalizeRef.current?.close();
  };
  const _handleNewWorkload = () => {
    console.log('new workload');
    navigate('NewWorkloadShipment');
    modalizeRef.current?.close();
  };

  const _deleteWorkload = () => {
    props.deleteWorkload();
    modalizeRef.current?.close();
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
          {!showButton ? (
            <>
              <TouchableOpacity
                onPress={_handleNewWorkload}
                // disabled={true}
                style={[Layout.center, Layout.fill]}
              >
                <MaterialIcons name="work" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny]}>New Workload</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // disabled={true}
                style={[Layout.center, Layout.fill]}
              >
                <FontAwesome5
                  name="clipboard-list"
                  style={[styles.ActionIcon]}
                />
                <Text style={[Fonts.textTiny]}>Product List</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // disabled={true}
                style={[Layout.center, Layout.fill]}
              >
                <FontAwesome5 name="route" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny]}>Optimmize Route</Text>
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
              {start && (
                <TouchableOpacity
                  onPress={_handleStartWorkload}
                  style={[Layout.center, Layout.fill]}
                >
                  <Fontisto name="export" style={[styles.ActionIcon]} />
                  <Text style={[Fonts.textTiny]}>Start</Text>
                </TouchableOpacity>
              )}
              {end && (
                <TouchableOpacity
                  onPress={_handleEndWorkload}
                  style={[Layout.center, Layout.fill]}
                >
                  <Fontisto name="import" style={[styles.ActionIcon]} />
                  <Text style={[Fonts.textTiny]}>End</Text>
                </TouchableOpacity>
              )}

              {!start && !end && (
                <>
                  <TouchableOpacity
                    onPress={_handleStartWorkload}
                    style={[Layout.center, Layout.fill]}
                  >
                    <Fontisto name="export" style={[styles.ActionIcon]} />
                    <Text style={[Fonts.textTiny]}>Start</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={_handleEndWorkload}
                    style={[Layout.center, Layout.fill]}
                  >
                    <Fontisto name="import" style={[styles.ActionIcon]} />
                    <Text style={[Fonts.textTiny]}>End</Text>
                  </TouchableOpacity>
                </>
              )}
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
                <Text style={[Fonts.textTiny]}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('press 1')}
                style={[Layout.center, Layout.fill]}
              >
                <Fontisto name="map-marker-alt" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny]}>Navigate</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('press 1')}
                style={[Layout.center, Layout.fill]}
              >
                <MaterialIcons name="message" style={[styles.ActionIcon]} />
                <Text style={[Fonts.textTiny]}>Message</Text>
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
  });

export default forwardRef(FabActionList);
