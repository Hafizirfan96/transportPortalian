import { Text, StyleSheet, View } from 'react-native';
import { wp } from '@/utils/layout-scaling';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@/hooks';
import moment = require('moment');
import { useEffect, useState } from 'react';
import React = require('react');

function ShiftTimer(props: any) {
  const { Colors, Layout, Fonts, Gutters } = useTheme();
  const styles = getStyles();
  const locDate = props.start;
  // const locDate = toLocalDate(props.start);
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
    dt.setSeconds(dt.getSeconds() + 2);
    // var now = moment(new Date());
    var now = moment(dt);

    var duration = moment.duration(now.diff(locDate));
    return (
      moment.utc(duration.as('milliseconds')).format('HH') +
      ' Hr ' +
      moment.utc(duration.as('milliseconds')).format('mm') +
      ' Min'
    );
  };
  const [Elapsed, SetElapsed] = useState(calcElapse());
  var start = moment(locDate);

  useEffect(() => {
    const interval = setInterval(() => {
      let elapsed = calcElapse();
      SetElapsed(elapsed);
    }, 1000);
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
    <View style={[Layout.row, Layout.alignItemsStart, Gutters.smallVMargin]}>
      <View style={[Layout.row, Layout.alignItemsCenter]}>
        <FeatherIcon
          name="arrow-right-circle"
          size={wp(15)}
          color={Colors.primaryTextColor}
          style={[Gutters.tinyRMargin]}
        />
        <Text
          style={[Fonts.textTinyBold, styles.txtTimer, { color: Colors.black }]}
        >
          Start: {moment(locDate).format('HH')}:{moment(locDate).format('mm')}
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
          Active: {Elapsed}
        </Text>
      </View>
    </View>
  );
}

const getStyles = () => {
  return StyleSheet.create({
    txtTimer: {
      fontSize: wp(10),
      color: '#000',
    },
  });
};

export default ShiftTimer;
