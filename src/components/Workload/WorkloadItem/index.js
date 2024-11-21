import React, { useState, memo, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Text,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { Config } from '@/config';
import CheckItem from '@/components/CheckItem';
import { useTheme } from '@/hooks';
import styles from './style';
import { wp } from '@/utils/layout-scaling';
import moment from 'moment';

function WorkloadItem(props) {
  const workload = props.workload;

  const { Common, Layout, Colors, Gutters, Fonts, Images } = useTheme();
  const [expanded, setExpanded] = useState(false);
  // var selected = workload.isSelected || false;
  const [cardBorderColor, setCardBorderColor] = useState({
    borderLeftColor: Colors.white,
  });
  useEffect(() => {
    updateCardBorderColor();
  }, [workload.Status]);

  const updateCardBorderColor = () => {
    let borderColor;
    switch (workload.Status) {
      case Config.WORKLOAD_STATUS.LOADED:
        borderColor = Colors.blue;
        break;
      case Config.WORKLOAD_STATUS.STARTED:
        borderColor = Colors.yellow;
        break;
      case Config.WORKLOAD_STATUS.COMPLETED:
        borderColor = Colors.appColor;
        break;
      default:
        borderColor = Colors.schedul;
    }
    setCardBorderColor({
      borderLeftColor: borderColor,
    });
  };

  const handleChangeExpanded = () => {
    const isTrue = workload.Detail.every(item => item.KolliNumber == null);
    if (!isTrue) {
      setExpanded(!expanded);
    }
  };

  const handleWorkloadItemSelectToggle = () => {
    // setSelected(!selected);
    props.onToggle({ ...workload, index: props.index });
  };

  const makeCall = number => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:' + number;
    } else {
      phoneNumber = 'telprompt:' + number;
    }

    Linking.openURL(phoneNumber);
  };

  const _renderWorkloadTypeIcon = type => {
    let iconName = 'truck-delivery';
    if (type == 2) {
      // iconName = 'package-variant';
      return <FontAwesome5 name={'box'} size={wp(18)} color={Colors.black} />;
    } else if (type == 3) {
      iconName = 'room-service';
    }
    return (
      <MaterialCommunityIcons
        name={iconName}
        size={wp(18)}
        color={Colors.black}
      />
    );
  };

  return (
    <View style={[Gutters.smallBMargin]}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: Colors.white,
            borderLeftWidth: 5,
          },
          Gutters.smallVPadding,
          Common.card,
          Gutters.mediumHMargin,

          cardBorderColor,
        ]}
        onPress={handleChangeExpanded}
        activeOpacity={0.9}
      >
        <View style={[Layout.row, Gutters.smallHPadding]}>
          <View style={[Layout.fill, Layout.row]}>
            {workload.Status == Config.WORKLOAD_STATUS.COMPLETED ? null : (
              <View style={styles.mainCheckbox}>
                <CheckItem
                  onChangeValue={handleWorkloadItemSelectToggle}
                  value={props.isSelected}
                  isContainerClickable={true}
                  colorActive={Colors.appColor}
                  colorInactive={Colors.schedul}
                  Icon={
                    props.isSelected ? (
                      <Image source={Images.activeCheckBox} />
                    ) : (
                      <Image source={Images.inActiveCheckBox} />
                    )
                  }
                />
              </View>
            )}
            <View style={[Layout.fill, Layout.column]}>
              <View style={[Layout.row]}>
                <TouchableOpacity
                  style={[{ flex: 2.5 }]}
                  onPress={handleWorkloadItemSelectToggle}
                  disabled={workload.Status == Config.WORKLOAD_STATUS.COMPLETED}
                >
                  <Text
                    style={[Fonts.textTinyBold]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {workload.Address}
                  </Text>
                </TouchableOpacity>

                <View style={[Layout.fill, Layout.alignItemsEnd]}>
                  <Text style={[Fonts.textTiny]}>
                    1 of {workload.Detail.length}
                  </Text>
                </View>
              </View>
              <View style={[Layout.row]}>
                <Text
                  style={[Layout.column, Fonts.textTiny, styles.workloadName]}
                >
                  {workload.Name}
                </Text>
                <TouchableOpacity
                  onPress={() => makeCall(workload.Phone)}
                  activeOpacity={0.7}
                  style={[Layout.column]}
                >
                  <Text style={[Fonts.textTiny, styles.touchableButton]}>
                    {workload.Phone}
                  </Text>
                </TouchableOpacity>
                <View style={[Layout.fill, Layout.alignItemsEnd]}>
                  {_renderWorkloadTypeIcon(workload.Type)}
                </View>
              </View>
              <View style={[Layout.row, Layout.justifyContentBetween]}>
                <Text style={[Fonts.textTiny]}>
                  {workload.PostCode} {workload.City}
                </Text>
                <Text style={[Fonts.textTiny]}>
                  {moment(workload?.Deadline).format('HH[h] mm[min]')}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {workload.Detail && expanded && (
          <>
            <View
              style={[
                Gutters.smallTMargin,
                {
                  height: wp(4),
                  backgroundColor: Colors.background,
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,

                  elevation: 24,
                },
              ]}
            />
            <View style={[Gutters.smallHPadding, Gutters.smallTMargin]}>
              {workload.Detail.map((subItem, index) => {
                if (subItem.KolliNumber !== null)
                  return (
                    <View
                      style={[Layout.row, Layout.fill, Layout.alignItemsCenter]}
                      key={index}
                    >
                      <Entypo
                        name="box"
                        size={wp(12)}
                        color={Colors.iconBlackGrey}
                      />
                      <Text style={[Fonts.textTiny, Gutters.tinyLMargin]}>
                        {subItem.KolliNumber}
                      </Text>
                    </View>
                  );
              })}
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
const PrevEqual = (prevProps, nextProps) => {
  return prevProps.isSelected === nextProps.isSelected;
};
export default React.memo(WorkloadItem, PrevEqual);
