import React, { useState } from 'react';
import ShiftTimer from './ShiftTimer';
import ShiftToggler from './ShiftToggler';
import { shiftSelector } from '@/store/Shift';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import getStyles from '@/screens/Dashboard/style';
import { useAppSelector, useTheme } from '@/hooks';
import { DashboardInfoModel, ShiftStartModel } from '@/interfaces';

const ScheduleInfoComponent = ({
  scheduleInfo,
  isShiftStarted,
  startShifts,
  endShifts,
  shiftInfo,
}: {
  scheduleInfo: DashboardInfoModel;
  isShiftStarted: boolean;
  shiftInfo: ShiftStartModel;
  isLoading: boolean;
  startShifts: any;
  endShifts: any;
}) => {
  const { Colors, Fonts, Gutters, Images, Layout, Common } = useTheme();

  const styles = getStyles(Colors, Fonts);
  const { myStartShiftData, isLoading } = useAppSelector(shiftSelector);
  const [showText, setshowText] = useState(false);
  const handleShowText = () => {
    setshowText(!showText);
  };

  return (
    <View style={[Common.contentWrapperDashboard]}>
      <View
        style={[
          Gutters.regularPadding,
          Common.card,
          Gutters.smallTMargin,
          { minHeight: 108 },
        ]}
      >
        <View style={[Layout.row, Layout.fill]}>
          <Image source={Images.avatar} style={[styles.avtar]} />
          <View style={[Gutters.regularLMargin, Layout.fill]}>
            <Text
              style={[Common.button.buttonText]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {scheduleInfo?.EmployeeName}
            </Text>
            <TouchableOpacity onPress={handleShowText}>
              <Text
                style={[styles.scheduleText]}
                numberOfLines={showText ? 2 : 1}
                ellipsizeMode="tail"
              >
                Scheduled to work at DHL
              </Text>
            </TouchableOpacity>
            {!isShiftStarted && (
              <Text
                style={[Fonts.textSmallBold]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {scheduleInfo?.StartTime} - {scheduleInfo?.EndTime}
              </Text>
            )}
          </View>
        </View>

        {isShiftStarted && <ShiftTimer start={shiftInfo?.StartDateTime} />}
      </View>
      <View style={[Gutters.largeRMargin, styles.shiftToggler]}>
        <ShiftToggler
          isShiftStarted={myStartShiftData !== null}
          isLoading={isLoading}
          shiftInfo={shiftInfo}
          startShifts={startShifts}
          endShifts={endShifts}
        />
      </View>
    </View>
  );
};

export default ScheduleInfoComponent;
