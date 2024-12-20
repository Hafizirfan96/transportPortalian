import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

const DateTimePickers = (props: any) => {
  const { Layout, Gutters, Fonts, Colors, darkMode } = useTheme();
  const styles = getStyles(Colors);

  const [isDateVisible, setIsDateVisible] = useState(false);

  const _toggleIsDateVisible = () => {
    setIsDateVisible(!isDateVisible);
  };

  const _handleDateValue = () => {
    if (props.value) return moment(props.value).format('DD-MM-YYYY ');
    return 'dd:mm';
  };

  const _handleDateConfirm = (date: any) => {
    _toggleIsDateVisible();
    props.handleDatePicked(date);
  };

  return (
    <View>
      <View style={[Layout.fill, Layout.column]}>
        <TouchableOpacity
          onPress={_toggleIsDateVisible}
          style={[
            styles.textContainer,
            Gutters.tinyLPadding,
            Gutters.tinyVPadding,
          ]}
        >
          <Text
            style={[
              props.labelstyle,
              Fonts.textNormal,
              styles.textMessageInput,
            ]}
          >
            {props.value ? <> {_handleDateValue()} </> : <>{props.label}</>}
          </Text>
        </TouchableOpacity>
      </View>

      {isDateVisible && (
        <DateTimePicker
          isVisible={isDateVisible}
          onConfirm={_handleDateConfirm}
          onChange={props.handleDateChange}
          onCancel={_toggleIsDateVisible}
          mode="date"
          minimumDate={props.minDate}
          date={props.value ? props.value : new Date()}
          accessible={true}
          isDarkModeEnabled={darkMode}
          textColor={Colors.primaryTextColor}
        />
      )}
    </View>
  );
};

export default DateTimePickers;

export const getStyles = (colors: any) => {
  var styles = StyleSheet.create({
    textContainer: {
      backgroundColor: colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: colors.black,
    },
    textMessageInput: {
      height: Platform.OS == 'ios' ? wp(25) : wp(30),
      fontSize: wp(14),
      padding: wp(5),
      marginLeft: wp(5),
      color: colors.placeHolderColor,

      // fontFamily: 'OsloSans-Bold',
    },
  });

  return styles;
};
