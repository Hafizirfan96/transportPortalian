import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useTheme } from '@/hooks';
import getStyles from './styles';
import { navigate } from '@/navigators/Root';

const Damagecontrol = () => {
  const { Layout, Common, Colors, Images, Fonts } = useTheme();
  const styles = getStyles(Colors);
  const [togglebutton, setTogglebutton] = useState(false);
  const toggleButtonClicked = () => {
    setTogglebutton(!togglebutton);
  };
  const handleNavigation = () => {
    navigate('RegisterNewDamage');
  };

  return (
    <>
      <View
        style={[
          styles.container,
          Common.itemShadow,
          Layout.row,
          Layout.justifyContentBetween,
        ]}
      >
        <Text style={[styles.containerText]}>Damage control:</Text>
        {togglebutton ? (
          <TouchableOpacity onPress={toggleButtonClicked}>
            <Image source={Images.toggleOn} style={styles.togglebutton} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleButtonClicked}>
            <Image source={Images.toggleOff} style={styles.togglebutton} />
          </TouchableOpacity>
        )}
      </View>
      {togglebutton && (
        <View>
          <Image source={Images.vehicleInspection} style={styles.imageStyle} />
          <View style={[styles.marginLeftRight]}>
            <TouchableOpacity
              onPress={handleNavigation}
              style={[Common.button.fullRounded, styles.margimbottom10]}
            >
              <Text style={[Common.button.buttonText, styles.colorwhite]}>
                Register New Damage
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
export default Damagecontrol;
