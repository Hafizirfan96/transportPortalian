import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { clearUserinfo, dashboardSelector } from '@/store/dashboard';
import { myStartedShifts } from '@/store/shift/shiftThunk';
import { ShiftTimer } from '@/components';
import { shiftSelector } from '@/store/shift';
import { logOutAndReset } from '@/store/logOut/logOutAndReset';
import { navigate } from './Root';

function CustomDrawer(props: any) {
  const { Colors, Layout, Fonts, Gutters, FontSize, Common, Images } =
    useTheme();
  const dispatch = useAppDispatch();

  const signOut = () => {
    dispatch(logOutAndReset());
    dispatch(clearUserinfo());
    navigate('Login');
  };

  const styles = getStyles(Colors, Fonts);
  const { scheduleInfo } = useAppSelector(dashboardSelector);
  const isShiftStarted = myStartedShifts !== null;
  const { myStartShiftData: shiftInfo } = useAppSelector(shiftSelector);
  return (
    <View style={[Layout.fill]}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.appColor }}
      >
        <View style={[Gutters.smallMargin]}>
          <View style={[Layout.row]}>
            <Image source={Images.avatar} style={styles.avtar} />
            <View style={[Gutters.regularLMargin]}>
              <Text style={styles.authorText}>
                {scheduleInfo?.EmployeeName}
              </Text>
              <Text style={styles.scheduleText}>Scheduled to work at DHL</Text>
              {!isShiftStarted ||
                (shiftInfo == null && (
                  <Text style={[Fonts.textSmallBold]}>
                    {scheduleInfo?.StartTime} - {scheduleInfo?.EndTime}
                  </Text>
                ))}
            </View>
          </View>
          <View style={styles.ShiftTimer}>
            {isShiftStarted && shiftInfo !== null && (
              <ShiftTimer start={shiftInfo?.StartDateTime} />
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            backgroundColor: Colors.primaryBackground,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: Colors.primaryTextColor,
        }}
      >
        <TouchableOpacity style={{ paddingVertical: 15 }} onPress={signOut}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5
              name="power-off"
              size={wp(15)}
              color={Colors.primaryTextColor}
              style={[Gutters.tinyRMargin]}
            />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'oslosans-medium',
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default CustomDrawer;

const getStyles = (colors: any, fonts: any) => {
  return StyleSheet.create({
    shiftToggler: {
      top: -20,
    },
    avtar: {
      width: wp(52),
      height: wp(52),
      borderRadius: wp(52),
    },

    authorText: {
      ...fonts.textSmallBold,
      fontSize: wp(18),
    },

    scheduleText: {
      ...fonts.textTinyBold,
      top: wp(-4),
    },
    ShiftTimer: {
      marginRight: wp(-5),
    },
  });
};
