import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useTheme, useAppSelector } from '@/hooks';
import getStyles from './style';
import { shiftSelector } from '@/store/shift';
import { navigate } from '@/navigators/Root';

function TourItem(props) {
  const tour = props.tour;
  // const tourIndex = props.tourIndex;

  const { Common, Layout, Fonts, Gutters, Images, Colors } = useTheme();
  const styles = getStyles(Colors);

  const { myStartShiftData } = useAppSelector(shiftSelector);

  const onStart = () => {
    props.onStart({
      selected: true,
      payload: {
        ProjectId: tour.ProjectId,
        TourId: tour.TourId,
        CustomerId: tour.CustomerId,
      },
    });
  };

  const onEnd = () => {
    onCardClicked();
    props.onEnd();
    navigate('EndTourAndWorkloadHistory', tour);
  };

  const onCardClicked = () => {
    console.log('onCardClicked: ', tour);
    props.setCardselect(previous => {
      return {
        ...previous,
        selected: true,
        payload: {
          ProjectId: tour.ProjectId,
          TourId: tour.TourId,
          CustomerId: tour.CustomerId,
        },
      };
    });
  };

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
            {tour.IsTourActive ? (
              <TouchableOpacity
                onPress={onEnd}
                disabled={tour.IsTourActive && props.isActive}
              >
                <Image source={Images.toggleOn} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled={!myStartShiftData} onPress={onStart}>
                <Image source={Images.toggleOff} />
              </TouchableOpacity>
            )}
          </View>

          <View style={[styles.status]}>
            {tour.IsTourActive ? (
              <Text style={[Fonts.textTiny]}>Started</Text>
            ) : (
              <Text style={[Fonts.textTiny]}>Pending</Text>
            )}
          </View>
        </View>
      </View>
      <View style={[Layout.row]}>
        <View style={[Layout.col, Layout.fill]}>
          <Text style={[Fonts.textSmallBold, Gutters.mediumlittPlusLMargin]}>
            {tour.TotalWorkloads}
          </Text>
          <Text style={[Fonts.textTiny]}>Total workloads</Text>
        </View>
        <View style={[Layout.col, Layout.alignItemsCenter]}>
          <Text style={[Fonts.textSmallBold]}>{tour.TotalProducts}</Text>
          <Text style={[Fonts.textTiny]}>Total Products</Text>
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
  );
}

export default TourItem;
