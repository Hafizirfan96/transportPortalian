import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { wp } from '@/utils/layout-scaling';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@/hooks';
import moment from 'moment';

function ShiftTimer(props: any) {
  const { Colors, Layout, Fonts, Gutters } = useTheme();
  const styles = getStyles();
  const locDate = toLocalDate(props.start);
  const calcElapse = () => {
    // const date_future = new Date()
    // const date_now = props.start

    // let seconds = Math.floor((date_future - date_now) / 1000)
    // let minutes = Math.floor(seconds / 60)
    // let hours = Math.floor(minutes / 60)
    // let days = Math.floor(hours / 24)

    // hours = hours - days * 24
    // minutes = minutes - days * 24 * 60 - hours * 60
    // seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60

    // let text = ''
    // hours = 23
    // if (hours > 0) {
    //   text = hours + 'Hr '
    // }
    // text = text + minutes + 'Min'
    var dt = new Date();
    dt.setSeconds(dt.getSeconds() + 10);
    // var now = moment(new Date());
    var now = moment(dt);

    var duration = moment.duration(now.diff(locDate));
    var final = moment.utc(duration.as('milliseconds'));
    return final.format('HH') + 'Hr ' + final.format('mm') + 'Min';
  };
  const [Elapsed, SetElapsed] = useState(calcElapse());
  var start = moment(locDate);

  useEffect(() => {
    const interval = setInterval(() => {
      let elapsed = calcElapse();
      SetElapsed(elapsed);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  function toLocalDate(serverdate: string) {
    var utcOffset = 0;
    var locdat = new Date(Date.parse(serverdate));
    utcOffset = Math.abs(locdat.getTimezoneOffset());

    locdat.setUTCMinutes(locdat.getUTCMinutes() + utcOffset);
    return locdat;
  }

  return (
    <View
      style={[Layout.row, Gutters.smallVMargin, Layout.justifyContentBetween]}
    >
      <View style={[Layout.row, Layout.fill, Layout.alignItemsCenter]}>
        <FeatherIcon
          name="arrow-right-circle"
          size={wp(15)}
          color={Colors.primaryTextColor}
          style={[Gutters.tinyRMargin]}
        />
        <Text style={[Fonts.textTinyBold, styles.txtTimer]}>
          Start Time{'   '}
          {start.format('HH')}:{start.format('mm')}
        </Text>
      </View>
      <View
        style={[
          Layout.fill,
          Layout.row,
          Layout.alignItemsCenter,
          Layout.justifyContentEnd,
        ]}
      >
        <FeatherIcon
          name="clock"
          size={wp(15)}
          color={Colors.primaryTextColor}
          style={[Gutters.tinyRMargin]}
        />
        <Text style={[Fonts.textTinyBold, styles.txtTimer]}>
          Active Time {Elapsed}
        </Text>
      </View>
    </View>
  );
}

const getStyles = () => {
  return StyleSheet.create({
    txtTimer: {
      fontSize: wp(10),
    },
  });
};

export default ShiftTimer;
