import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/hooks';
import getStyles from './style';

const TourSummery = () => {
  const { Common, Layout, Fonts, Gutters, Colors } = useTheme();
  const styles = getStyles();

  return (
    <View
      style={[
        Gutters.smallPadding,
        Common.card,
        Gutters.mediumHMargin,
        Gutters.regularBMargin,
        Gutters.regularPadding,
      ]}
    >
      <View style={[Layout.row]}>
        <View style={[Layout.alignItemsStart, Layout.fill]}>
          <Text style={Fonts.textSmallBold}>DHL OV6X</Text>
        </View>
        <View
          style={[
            Layout.alignItemsEnd,
            Layout.justifyContentBetween,
            Layout.fill,
          ]}
        ></View>
      </View>
      <View style={[Layout.row]}>
        <View style={[Layout.fill]}>
          <Text style={[Fonts.textTiny]}>Start Time</Text>
          <Text style={[Fonts.textRegularBold]}>05:10AM</Text>
        </View>
        <View style={[Layout.alignItemsCenter]}>
          <Text style={[Fonts.textTiny]}>End Time</Text>
          <Text style={[Fonts.textRegularBold]}>10:00AM</Text>
        </View>

        <View style={[Layout.alignItemsEnd, styles.endTimeView]}>
          <View style={[styles.iconStyle]}></View>
        </View>
      </View>
      <View style={[Layout.row]}>
        <View style={[Layout.fill]}>
          <Text style={[Fonts.textSmallBold, Gutters.mediumlittPlusLMargin]}>
            60
          </Text>
          <Text style={[Fonts.textTiny]}>Total workloads</Text>
        </View>
        <View style={[Layout.alignItemsCenter]}>
          <Text style={[Fonts.textSmallBold]}>5</Text>
          <Text style={[Fonts.textTiny]}>Total Products</Text>
        </View>
        <View style={[Layout.alignItemsEnd, styles.selfView]} />
      </View>
    </View>
  );
};

export default TourSummery;
