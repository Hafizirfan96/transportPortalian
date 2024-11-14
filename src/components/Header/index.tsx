import axios from 'axios';
import React = require('react');
import moment = require('moment');
import getStyles from './style';
import { Config } from '@/Config';
import { storage } from '@/store';
import { useDispatch } from 'react-redux';
import { wp } from '@/utils/layout-scaling';
import { useEffect, useState } from 'react';
import { setlocation } from '@/store/location';
import { StorageKeys } from '@/utils/localStorage';
import { useAppSelector, useTheme } from '@/hooks';
import Geolocation from 'react-native-geolocation-service';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { navigateBack, toggleDrawer } from '@/navigators/Root';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function HeaderSpan(props: any) {
  const { Colors, Layout, Fonts, Gutters, Images } = useTheme();
  const dispatch = useDispatch();
  const styles = getStyles(Colors, props);
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  const { location } = useAppSelector(state => state.location);

  useEffect(() => {
    updateLocation();
    const interval = setInterval(() => {
      var dt = moment().format('HH:mm');
      setCurrentTime(dt);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchLocationName = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const API_KEY = Config.KEYS.API_KEY;
        const BASE_URL = Config.KEYS.BASE_URL;
        const response = await axios.get(
          `${BASE_URL}mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${API_KEY}`,
        );
        const locationName = response.data.features[0].place_name;
        // console.log(locationName);
        await storage.setItem(StorageKeys.locationName, locationName);
        dispatch(
          setlocation({
            location: locationName,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }),
        );
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const toggleSideMenu = () => {
    toggleDrawer();
  };

  const _renderMenuIcon = () => {
    return !props.backPage ? (
      <TouchableOpacity
        onPress={toggleSideMenu}
        style={[Layout.alignItemsStart]}
      >
        <FeatherIcon
          name="menu"
          size={wp(24)}
          color={Colors.primaryTextColor}
        />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={() => navigateBack()}
        style={[styles.imageIcon, Layout.justifyContentCenter]}
      >
        <Image source={Images.backArrow} style={[styles.backArrow]} />
      </TouchableOpacity>
    );
  };

  const _renderMenu = () => {
    return (
      <TouchableOpacity onPress={props.openSortModal}>
        <FontAwesome
          name="exchange"
          style={[styles.iconColor, { transform: [{ rotate: '90deg' }] }]}
          size={wp(20)}
          color={Colors.primaryTextColor}
        />
      </TouchableOpacity>
    );
  };

  const updateLocation = () => {
    fetchLocationName();
  };

  return (
    <View style={[styles.headerStyles]}>
      <View style={[Layout.row, Layout.justifyContentCenter]}>
        <View>{_renderMenuIcon()}</View>
        <View style={[Layout.fill, Layout.colCenter]}>
          <Text style={[Fonts.textLargeBold]}>{props.title} </Text>
        </View>
        <View style={[Layout.column]}>{props.rightAction}</View>
      </View>

      {/* {props.titleMessage && props.titleMessage !== '' && (
        <View style={(Layout.row, Layout.colCenter)}>
          <Text style={[Fonts.textRegularBold, styles.titleMessageTextStyles]}>
            {props.titleMessage}
          </Text>
        </View>
      )} */}

      {!props.notShowIcons && (
        <View
          style={[
            Layout.row,
            Gutters.tinyVMargin,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
            props.ContainerStyle,
            !props.titleMessage || props.titleMessage === ''
              ? styles.locationInfo
              : null,
          ]}
        >
          <View style={[Layout.alignItemsStart, styles.locationHeading]}>
            <TouchableOpacity onPress={updateLocation}>
              <View
                style={[
                  Layout.row,
                  Layout.alignItemsCenter,
                  { width: wp(220) },
                ]}
              >
                <MaterialIcons
                  name="location-on"
                  size={wp(20)}
                  color={Colors.primaryTextColor}
                />
                <Text> </Text>
                <Text style={[Fonts.textTiny]}>{location}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[Layout.alignItemsEnd]}>
            <View
              style={[Layout.row, Layout.alignItemsCenter, Gutters.tinyRMargin]}
            >
              <FeatherIcon
                name="clock"
                size={wp(18)}
                color={Colors.primaryTextColor}
                style={[Gutters.tinyRMargin]}
              />
              <Text style={[Fonts.textTiny]}>{currentTime}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default HeaderSpan;
