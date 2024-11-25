import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useAppSelector, useTheme } from '@/hooks';
import styles from './styles';
import _ from 'lodash';
import { lorriSelector } from '@/store/lorry';

const LorryCard = props => {
  const { Images, Fonts, Layout, Common, Gutters, Colors } = useTheme();
  const { isUpdatingLorry, selectedIndex } = useAppSelector(lorriSelector);
  const ref_input_field = useRef(null);

  const initialState = props.lorry.LastKm;
  const [kmtext, setKmtext] = useState(initialState);
  const [showText, setshowText] = useState(false);
  const handleShowText = () => {
    setshowText(!showText);
  };
  const onInputText = killometers => {
    // console.log('text entered ', killometers);
    setKmtext(killometers);
  };
  const editableKm = () => {
    ref_input_field.current.focus();
  };
  const debouncedSearch = _.debounce(onInputText, 1000);
  const inputTextKm = killometers => {
    debouncedSearch(killometers);
  };
  const lorryStart = () => {
    const payload = {
      VehicleId: props.lorry.VehicleId,
      StartKm: kmtext,
      StartPosition: 'Oslo',
      TVId: props.lorry.TourVehicleId,
      index: props.index,
    };
    props.lorryStart(payload);
  };
  const lorryEnd = () => {
    const endVehicles = {
      VehicleId: props.lorry.VehicleId,
      TourVehicleId: props.lorry.TourVehicleId,
      EndKm: kmtext,
      EndPosition: 'Oslo',
      index: props.index,
    };

    props.lorryEnd(endVehicles);
  };
  return (
    <View
      style={[
        Gutters.smallPadding,
        Common,
        Gutters.regularBMargin,
        styles.container,
      ]}
    >
      <View style={[Layout.row]}>
        <View style={styles.imageView}>
          <Image
            source={require('@/assets/Images/demoimagelorry.png')}
            style={styles.imagewithHeight}
          />
        </View>
        <TouchableOpacity
          style={[Layout.fill, styles.margin5]}
          onPress={handleShowText}
        >
          <Text
            numberOfLines={showText ? 2 : 1}
            style={[Fonts.textRegularBold]}
          >
            {props.lorry.Name}
          </Text>

          <View style={[Layout.row, styles.margintopminus5]}>
            <Text style={Fonts.textTiny}>
              Capacity:{props.lorry.LastKm} {'     '}
            </Text>
            <Text style={[Fonts.textTiny]}>{props.lorry.LastKm} Mins away</Text>
          </View>
        </TouchableOpacity>
        <View style={[Layout.center, styles.width60]}>
          {isUpdatingLorry && selectedIndex == props.index ? (
            <ActivityIndicator
              size={35}
              style={[Layout.justifyContentFlexStart]}
            />
          ) : props.lorry.IsVehicleActive ? (
            <TouchableOpacity onPress={lorryEnd}>
              <Image
                source={Images.toggleOn}
                style={styles.togglebutton}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={lorryStart}>
              <Image
                source={Images.toggleOff}
                style={styles.togglebutton}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!props.lorry.IsVehicleActive ? (
        <View style={[styles.bottomlayout]}>
          <View style={[Layout.row, Layout.justifyContentBetween]}>
            <Text style={[Fonts.textSmall]}>Registration</Text>
            <View style={[Layout.row]}>
              <Text style={[Fonts.textSmall]}>
                {props.lorry.RegistrationNumber}
              </Text>
            </View>
          </View>
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              styles.killometersView,
            ]}
          >
            <Text style={[Fonts.textSmall]}>Killometer</Text>
            <View style={[Layout.row]}>
              <View
                style={[Layout.row, Layout.justifyContentEnd, styles.inputView]}
              >
                <TextInput
                  ref={ref_input_field}
                  style={[styles.bottomInputTextStyle, Fonts.textTiny]}
                  keyboardType="numeric"
                  onChangeText={inputTextKm}
                  placeholder="0"
                  placeholderTextColor={Colors.secondaryTextColor}
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                  blurOnSubmit={false}
                />

                <Text style={[Fonts.textTiny]}>KM</Text>
                <TouchableOpacity onPress={editableKm}>
                  <Image source={Images.notesIcon} style={styles.iconstyle} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};
export default LorryCard;
