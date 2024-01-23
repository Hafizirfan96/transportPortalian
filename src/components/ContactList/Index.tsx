import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks';

import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import getStyles from './style';

function ContactList() {
  const { Colors, Layout, Fonts, Gutters, Images, Common } = useTheme();
  const styles = getStyles(Colors, Fonts);
  const [active, setActive] = useState(true);
  const _renderContactListInfo = () => {
    return (
      <>
        <View
          style={[
            Gutters.smallPadding,
            Common.card,
            Common.contentWrapperDashboard,
          ]}
        >
          <View style={[Layout.row]}>
            <Image source={Images.avatar} style={styles.avtar} />
            <View style={[Gutters.smallLMargin]}>
              <View
                style={[
                  Layout.row,
                  Layout.justifyContentBetween,
                  styles.nameView,
                ]}
              >
                <Text style={styles.authorText}>James</Text>

                <TouchableOpacity
                  onPress={() => setActive(false)}
                  style={[
                    Layout.justifyContentCenter,
                    active ? styles.activeColor : styles.inActiveColor,
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      Fonts.textTiny,
                      Layout.alignSelfCenter,
                      active ? null : styles.activeText,
                    ]}
                  >
                    Active
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.scheduleText}>
                Scheduled to work at kitchen
              </Text>
              <Text style={[Fonts.textSmallBold]}>10:00 AM - 7:30PM</Text>
            </View>
          </View>
          <View style={[Gutters.largeLPadding]}>
            <Text style={[styles.phoneText]}>+91 00000 0000</Text>
          </View>
        </View>
      </>
    );
  };
  return (
    <CustomSafeArea>
      <View style={[Layout.fill, styles.container]}>
        {_renderContactListInfo()}
      </View>
    </CustomSafeArea>
  );
}

export default ContactList;
