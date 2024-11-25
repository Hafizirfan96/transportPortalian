import React from 'react';
import { View, Text, TouchableOpacity, Image, Pressable } from 'react-native';
import { useTheme, useAppSelector } from '@/hooks';
import getStyles from './style';
import { shiftSelector } from '@/store/Shift';
import { navigate } from '@/navigators/Root';
import { ActivityIndicator } from 'react-native';

function TourItem(props: any) {
  const tour = props.tour;
  // const tourIndex = props.tourIndex;

  const { Common, Layout, Fonts, Gutters, Images, Colors } = useTheme();
  const styles = getStyles(Colors);

  const { myStartShiftData } = useAppSelector(shiftSelector);

  return (
    <Pressable onPress={props.isShiftStarted} disabled={!!myStartShiftData}>
      <View
        style={[
          Gutters.smallPadding,
          Common.card,
          Gutters.mediumHMargin,
          Gutters.smallBMargin,
          Gutters.regularPadding,
        ]}
      >
        <View style={[Layout.row]}>
          <View style={[Layout.col, Layout.alignItemsStart, Layout.fill]}>
            <Text style={Fonts.textSmallBold}>{tour.Name}</Text>
          </View>
          <View
            style={[
              Layout.col,
              Layout.alignItemsEnd,
              Layout.justifyContentBetween,
              Layout.fill,
            ]}
          ></View>
        </View>
        <View style={[Layout.row]}>
          <View style={[Layout.col, Layout.fill]}>
            <Text style={[Fonts.textTiny]}>Start Time</Text>
            <Text style={[Fonts.textRegularBold]}>{tour.StartTime}</Text>
          </View>
          <View style={[Layout.col, Layout.alignItemsCenter]}>
            <Text style={[Fonts.textTiny]}>End Time</Text>
            <Text style={[Fonts.textRegularBold]}>{tour.EndTime}</Text>
          </View>

          <View style={[Layout.col, Layout.alignItemsEnd, { flex: 0.5 }]}>
            <View style={[styles.iconStyle]}>
              {props.isUpdating ? (
                <ActivityIndicator
                  size={35}
                  style={{ justifyContent: 'flex-start' }}
                />
              ) : tour.IsTourActive ? (
                <TouchableOpacity
                  onPress={() =>
                    props.endtour({ ...tour, index: props.tourIndex })
                  }
                  disabled={tour.IsTourActive && props.isActive}
                >
                  <Image
                    source={Images.toggleOn}
                    style={[styles.toggleImage]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  disabled={!myStartShiftData}
                  onPress={() =>
                    props.onStart({ ...tour, index: props.tourIndex })
                  }
                >
                  <Image
                    source={Images.toggleOff}
                    style={[styles.toggleImage]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* <View style={[styles.status]}>
            {tour.IsTourActive ? (
              <Text style={[Fonts.textTiny]}>Started</Text>
            ) : (
              <Text style={[Fonts.textTiny]}>Pending</Text>
            )}
          </View> */}
          </View>
        </View>
        <View style={[Layout.row]}>
          <View style={[Layout.col, Layout.fill]}>
            <Text style={[Fonts.textTiny]}>Total workloads</Text>
            <Text
              style={[Fonts.textRegularBold, Gutters.mediumlittPlusLMargin]}
            >
              {tour.TotalWorkloads}
            </Text>
          </View>
          <View style={[Layout.col, Layout.alignItemsCenter]}>
            <Text style={[Fonts.textTiny]}>Total Products</Text>
            <Text style={[Fonts.textRegularBold]}>{tour.TotalProducts}</Text>
          </View>
          <View style={[Layout.col, Layout.alignItemsEnd, styles.selfView]} />
        </View>

        {tour.IsTourActive && (
          <View style={[Layout.row, styles.km, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textTiny]}>Total KM of optimized workload</Text>
            <Text style={[Fonts.textSmallBold, styles.limit]}>
              {tour.optimizedWorkload}Km
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default TourItem;
