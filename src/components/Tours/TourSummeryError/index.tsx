import React from 'react';
import { View, Text, Image } from 'react-native';
import { useTheme } from '@/hooks';
import getStyles from './style';

const TourSummeryError = () => {
  const { Common, Layout, Fonts, Gutters, Colors, Images } = useTheme();
  const styles = getStyles(Colors);

  return (
    <View
      style={[
        Gutters.smallPadding,
        Common.card,
        Gutters.mediumHMargin,
        Gutters.regularBMargin,
        // Gutters.regularPadding,
        styles.container,
      ]}
    >
      <View style={[Layout.row]}>
        <Image source={Images.warningIcon} style={styles.imageStyle} />
        <Text style={styles.warningHeading}>
          You need to end all Active Tours before ending your shift.
        </Text>
      </View>
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
          <Text style={[Fonts.textRegularBold]}>---------</Text>
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

export default TourSummeryError;
