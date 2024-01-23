import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
//import NavigationService from "../services/NavigationService";
//import { TestContext } from "../context";
import getStyles from './style';
import { useTheme } from '@/hooks';
import { navigateBack, toggleDrawer } from '@/navigators/Root';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { wp } from '@/utils/layout-scaling';
import moment from 'moment';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { storage } from '@/store';
import { StorageKeys } from '@/utils/localStorage';
import { Config } from '@/config';

function HeaderSpan(props: any, { navigation, route }) {
  const { Colors, Layout, Fonts, Gutters, Images, Common } = useTheme();
  const styles = getStyles(Colors);
  const [location, setLocation] = useState('Grets vei 5, 1540 Vestby');
  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm'));
  useEffect(() => {
    const interval = setInterval(() => {
      var dt = moment().format('HH:mm');
      setCurrentTime(dt);
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  }

  useEffect(() => {
    requestPermissions();
    fetchLocationName();
  }, [location]);
  function toggleSideMenu() {
    //NavigationService.toggleDrawer();
    toggleDrawer();
  }

  // const [time, setTime] = useState(getCurrentTimeString)
  const fetchLocationName = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const API_KEY = Config.KEYS.API_KEY;
        const BASE_URL = Config.KEYS.BASE_URL;
        const response = await axios.get(
          `${BASE_URL}?latlng=${position.coords.latitude},${position.coords.longitude}&key=${API_KEY}`,
        );
        // console.log('locationName---', response.data);
        const locationName = response.data.results[0].formatted_address;
        storage.set(StorageKeys.locationName, locationName);
        setLocation(locationName);
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const _renderMenuIcon = props => {
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
      <TouchableOpacity onPress={() => navigateBack()}>
        <Image source={Images.backArrow} style={[styles.backArrow]} />
      </TouchableOpacity>
    );
  };
  const _renderSortIcon = props => {
    return props.sortPage && props.openSortModal ? (
      <TouchableOpacity
        onPress={props.openSortModal}
        style={[Layout.alignItemsStart]}
      >
        <FontAwesome
          onPress={props.openSortModal}
          name="exchange"
          style={[{ transform: [{ rotate: '90deg' }] }]}
          size={6}
          color={Colors.primaryTextColor}
        />
      </TouchableOpacity>
    ) : null;
  };

  const _renderMenu = props => {
    return props.sortPage && props.openSortModal ? (
      <TouchableOpacity onPress={props.openSortModal}>
        <FontAwesome
          name="exchange"
          style={[styles.iconColor, { transform: [{ rotate: '90deg' }] }]}
          size={wp(20)}
          color={Colors.primaryTextColor}
        />
      </TouchableOpacity>
    ) : // <Menu
    //   shadow={5}
    //   w="190"
    //   closeOnSelect={true}
    //   onOpen={() => console.log('opened')}
    //   onClose={() => console.log('closed')}
    //   onPress={item => console.log('press', item)}
    //   placement="bottom right"
    //   trigger={triggerProps => {
    //     return (
    //       <Pressable {...triggerProps}>
    //         <Icon
    //           name="exchange"
    //           style={[styles.iconColor, { transform: [{ rotate: '90deg' }] }]}
    //           as={FontAwesome}
    //           size={6}
    //         />
    //       </Pressable>
    //     )
    //   }}
    // >
    //   <Menu.Item
    //     value="Customer name"
    //     onPress={() => props.sortSelected('Name', 'asc')}
    //   >
    //     Customer name A-Z
    //   </Menu.Item>
    //   <Menu.Item onPress={() => props.sortSelected('Name', 'desc')}>
    //     Customer Name Z-A
    //   </Menu.Item>
    //   <Divider mt="3" w="100%" />
    //   <Menu.Item onPress={() => props.sortSelected('Address', 'asc')}>
    //     Address A-Z
    //   </Menu.Item>
    //   <Menu.Item onPress={() => props.sortSelected('Address', 'desc')}>
    //     Address Z-A
    //   </Menu.Item>
    //   <Divider mt="3" w="100%" />
    //   <Menu.Item onPress={() => props.sortSelected('PostCode', 'asc')}>
    //     Zipcode low - high
    //   </Menu.Item>
    //   <Menu.Item onPress={() => props.sortSelected('PostCode', 'asc')}>
    //     Zipcode hight-low
    //   </Menu.Item>
    // </Menu>
    null;
  };
  const updateLocation = () => {
    fetchLocationName();
  };
  return (
    <View style={[styles.headerStyles]}>
      <View style={[Layout.row]}>
        <View style={[Layout.col]}>{_renderMenuIcon(props)}</View>
        <View style={[Layout.col, Layout.fill, Layout.colCenter]}>
          <Text style={[Fonts.textMediumBold]}>{props.title} </Text>
        </View>
        <View style={[Layout.col]}>{props.rightAction}</View>
      </View>

      {props.titleMessage && props.titleMessage != '' ? (
        <View style={(Layout.row, Layout.colCenter)}>
          <Text style={[Fonts.textRegularBold, styles.titleMessageTextStyles]}>
            {props.titleMessage ? props.titleMessage : ''}
          </Text>
        </View>
      ) : null}

      {!props.notShowIcons && (
        <View
          style={[
            Layout.row,
            Gutters.tinyVMargin,
            !props.titleMessage || props.titleMessage == ''
              ? styles.locationInfo
              : null,
          ]}
        >
          <View style={[Layout.alignItemsStart, styles.locationHeading]}>
            <TouchableOpacity onPress={updateLocation}>
              <View style={[Layout.row, Layout.alignItemsCenter]}>
                <MaterialIcons
                  name="location-on"
                  size={wp(20)}
                  color={Colors.primaryTextColor}
                />
                <Text style={[Fonts.textTiny]}>{location}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={[Layout.fill, Layout.alignItemsEnd]}>
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
