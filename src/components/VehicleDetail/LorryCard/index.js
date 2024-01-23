import React, { useState, useRef } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/hooks';
import styles from './styles';
import _ from 'lodash';

const LorryCard = props => {
  const { Images, Fonts, Layout, Common, Gutters, Colors } = useTheme();
  const [togglebutton, setTogglebutton] = useState(props.lorry.IsVehicleActive);

  const ref_input_field = useRef(null);

  const initialState = props.lorry.LastKm;
  const [kmtext, setKmtext] = useState(initialState);
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
    };
    setTogglebutton(true);
    props.lorryStart(payload);
  };
  const lorryEnd = () => {
    const endVehicles = {
      VehicleId: props.lorry.VehicleId,
      TourVehicleId: props.lorry.TourVehicleId,
      EndKm: kmtext,
      EndPosition: 'Oslo',
    };

    setTogglebutton(false);
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
        <View style={[Layout.fill, styles.margin5]}>
          <Text numberOfLines={1} style={[Fonts.textRegularBold]}>
            {props.lorry.Name}
          </Text>

          <View style={[Layout.row, styles.margintopminus5]}>
            <Text style={Fonts.textTiny}>
              Capacity:{props.lorry.LastKm} {'     '}
            </Text>
            <Text style={[Fonts.textTiny]}>{props.lorry.LastKm} Mins away</Text>
          </View>
        </View>
        <View style={[Layout.center, styles.width60]}>
          {props.lorry.IsVehicleActive ? (
            <TouchableOpacity onPress={lorryEnd}>
              <Image source={Images.toggleOn} style={styles.togglebutton} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={lorryStart}>
              <Image source={Images.toggleOff} style={styles.togglebutton} />
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
