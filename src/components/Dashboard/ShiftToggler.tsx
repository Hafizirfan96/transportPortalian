import React from 'react';
import { Text, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useTheme, useAppDispatch } from '@/hooks';
import StorageService from '@/services/StorageService';
import { Config } from '@/config';
import { setShiftInfo } from '@/store/shift';
import {
  endShift,
  startShift,
  myStartedShifts,
} from '@/store/shift/shiftThunk';

function ShiftToggler(props: any) {
  const { Colors, Common, Layout, Fonts, Gutters } = useTheme();
  var isTrue = StorageService.get(Config.KEYS.SHIFT_INFO);

  const dispatch = useAppDispatch();

  const startShifts = async () => {
    const data = {
      StartPosition: 'APP',
      StateDateTime: new Date().toISOString(),
    };
    dispatch(startShift(data));
    await StorageService.set(Config.KEYS.SHIFT_INFO, props.shiftInfo);

    dispatch(setShiftInfo(props.shiftInfo));
    dispatch(myStartedShifts());
  };

  const endShifts = async () => {
    const data = {
      Id: isTrue?.id,
      EndPosition: 'APP',
      EndDateTime: new Date().toISOString(),
    };
    dispatch(endShift(data));
    StorageService.set(Config.KEYS.SHIFT_INFO, null);
    dispatch(setShiftInfo(null));
  };
  return (
    <View
      style={[Layout.row, Layout.justifyContentEnd, Gutters.regularTMargin]}
    >
      {props.isShiftStarted == false ? (
        <TouchableOpacity
          style={[Common.button.btnSmallRounded]}
          onPress={startShifts}
          activeOpacity={0.7}
        >
          {props.isLoading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Text style={[Fonts.textSmallBold, Layout.center]}>Start</Text>
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[Common.button.btnSmallRounded]}
          onPress={endShifts}
          activeOpacity={0.7}
        >
          {props.isLoading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            <Text style={[Fonts.textSmallBold, Layout.center]}>End</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
export default ShiftToggler;
