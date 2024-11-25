import moment from 'moment';
import getStyles from './style';
import { Config } from '@/Config';
import { useTheme } from '@/hooks';
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';

function RouteOptimizeItem(props: any) {
  const workload = props.workload;
  const { isFirst, isLast } = props;

  const { Common, Layout, Colors, Gutters, Fonts, Images } = useTheme();
  const styles = getStyles(Colors);
  const [cardBorderColor, setCardBorderColor] = useState({
    iconImage: null,
  });
  useEffect(() => {
    updateCardBorderColor();
  }, [workload.Status]);

  const updateCardBorderColor = () => {
    let image;
    switch (workload.Status) {
      case Config.WORKLOAD_STATUS.LOADED:
        image = Images.pinBlack;
        break;
      case Config.WORKLOAD_STATUS.STARTED:
        image = Images.pinYellow;
        break;
      case Config.WORKLOAD_STATUS.COMPLETED:
        image = Images.pinGreen;

        break;
      default:
        image = Images.pinBlack;
    }
    setCardBorderColor({
      iconImage: image,
    });
  };
  const handleLong = () => {
    props.onLongPress();
  };

  return (
    <TouchableOpacity
      style={[
        Common.card,
        Gutters.mediumHMargin,
        Gutters.smallBMargin,
        Layout.row,
      ]}
      onLongPress={handleLong}
    >
      {isFirst ? (
        <View
          style={[
            Gutters.regularPadding,
            Gutters.regularHPadding,
            styles.backgroundColor,
          ]}
        >
          <Image source={Images.markFirst} resizeMode="contain" />
        </View>
      ) : null}

      <View style={[Layout.row, Layout.fill]}>
        <View
          style={[
            Layout.center,
            styles.locationWrapper,
            Gutters.smallVMargin,
            Gutters.smallLMargin,
          ]}
        >
          <Image
            source={cardBorderColor.iconImage}
            style={[styles.locationImage]}
          />
        </View>
        <View style={[Gutters.smallLMargin, Gutters.smallTMargin, Layout.fill]}>
          <Text
            style={[Fonts.textTinyBold]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {workload.Address}
          </Text>
          <View style={[Gutters.tinyVMargin]}>
            <Text style={[Fonts.textTiny]}>
              {workload.PostCode} {workload.City}
            </Text>
          </View>
        </View>
        <View
          style={[Layout.fill, Gutters.smallTMargin, Gutters.mediumLMargin]}
        >
          <Text style={[Fonts.textTinyBold]}>
            {moment(workload?.Deadline).format('HH[h] mm[min]')}
          </Text>
        </View>
        <View style={[Gutters.smallRMargin, Gutters.smallTMargin]}>
          <Image source={Images.bothArrow} />
        </View>
      </View>
      {isLast ? (
        <View
          style={[
            Gutters.regularPadding,
            Gutters.regularHPadding,
            styles.backgroundColor,
          ]}
        >
          <Image source={Images.markLast} resizeMode="contain" />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
const PrevEqual = (prevProps, nextProps) => {
  return (
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.index === nextProps.index
  );
};
export default React.memo(RouteOptimizeItem, PrevEqual);
