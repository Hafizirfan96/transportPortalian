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
} from '@/store/Shift/shiftThunk';

function ShiftToggler(props: any) {
  const { Colors, Common, Layout, Fonts, Gutters } = useTheme();

  const dispatch = useAppDispatch();

  return (
    <View style={[Layout.row, Layout.justifyContentEnd, Gutters.smallTMargin]}>
      {props.isShiftStarted === false ? (
        <TouchableOpacity
          style={[Common.button.btnSmallRounded]}
          onPress={props.startShifts}
          activeOpacity={0.7}
        >
          {props.isLoading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            !props.isShiftStarted && (
              <Text style={[Fonts.textSmallBold, Layout.center]}>Start</Text>
            )
          )}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[Common.button.btnSmallRounded]}
          onPress={props.endShifts}
          activeOpacity={0.7}
        >
          {props.isLoading ? (
            <ActivityIndicator size="small" color={Colors.white} />
          ) : (
            props.isShiftStarted && (
              <Text style={[Fonts.textSmallBold, Layout.center]}>End</Text>
            )
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}
export default ShiftToggler;
