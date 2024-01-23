import React, { useState, memo, useEffect } from 'react';
import { View, TouchableOpacity, Linking, Platform, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Config } from '@/config';
import CheckItem from '@/components/CheckItem';
import { useTheme } from '@/hooks';
import styles from './style';
import { wp } from '@/utils/layout-scaling';
import moment from 'moment';

function WorkloadItem(props) {
  const workload = props.workload;

  const [expanded, setExpanded] = useState(false);
  const isSelected = props.workload.isSelected ? true : false;
  const [selected, setSelected] = useState(isSelected);

  const { Common, Layout, Colors, Gutters, Fonts } = useTheme();
  useEffect(() => {
    if (props.workload.isSelected) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [props.workload]);
  let cardColor = selected ? Colors.appColor : Colors.white;
  let textColor = selected ? Colors.white : Colors.text;
  let icnColor = selected ? Colors.white : Colors.appColor;

  let cardBorderColor = {
    borderLeftColor: Colors.white,
    borderLeftWidth: 0,
  };
  if (workload.Status == Config.WORKLOAD_STATUS.LOADED) {
    cardBorderColor.borderColor = Colors.blue;
    cardBorderColor.borderLeftWidth = 5;
  } else if (workload.Status == Config.WORKLOAD_STATUS.STARTED) {
    cardBorderColor.borderColor = Colors.yellow;
    cardBorderColor.borderLeftWidth = 5;
  } else if (workload.Status == Config.WORKLOAD_STATUS.COMPLETED) {
    cardBorderColor.borderColor = Colors.appColor;
    cardBorderColor.borderLeftWidth = 5;
  }
  let cardBg = {
    backgroundColor: cardColor,
  };
  let txtColor = {
    color: textColor,
  };
  let iconColor = {
    color: icnColor,
  };

  const handleChangeExpanded = () => {
    setExpanded(!expanded);
  };
  const handleWorkloadItemSelectToggle = () => {
    props.onToggle(workload, !selected);
    setSelected(!selected);
  };

  const makeCall = number => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:' + number;
    } else {
      phoneNumber = 'telprompt:' + number;
    }

    console.log(phoneNumber);
    Linking.openURL(phoneNumber);
  };

  const _renderWorkloadTypeIcon = type => {
    let iconName = 'truck-delivery-outline';
    if (type == 2) {
      iconName = 'package-variant';
    } else if (type == 3) {
      iconName = 'room-service-outline';
    }
    return (
      <MaterialCommunityIcons
        name={iconName}
        size={wp(18)}
        color={Colors.primaryTextColor}
      />
    );
  };

  const _renderSubItem = sub => {
    return (
      <View
        style={[
          Gutters.smallPadding,
          Common.card,
          Gutters.smallBMargin,
          Gutters.mediumTPadding,
          styles.subItem,
          Layout.selfEnd,
          cardBg,
        ]}
      >
        {sub.map(subItem => {
          return (
            <View style={[Layout.row, Layout.fill]} key={subItem.KolliNumber}>
              {/*  <View style={{ flex: 0.25 }}>
                 <CheckItem
                    onChangeValue={() =>
                      handleWorkloadSubItemSelectToggle(
                        workloadIndex,
                        subItemIndex,
                      )
                    }
                    value={selected}
                    isContainerClickable={true}
                  /> 
                </View>*/}
              <Text style={[Fonts.textTiny]}>{subItem.KolliNumber}</Text>
            </View>
          );
        })}
      </View>
    );
  };
  const myconsole = () => console.log('rendering workload item', workload);
  return (
    <>
      {/* {myconsole()} */}
      {/* {console.log(cardBorderColor)} */}
      <TouchableOpacity
        style={[
          Gutters.smallPadding,
          Common.card,
          Gutters.mediumHMargin,
          Gutters.smallBMargin,
          cardBg,
          cardBorderColor,
        ]}
        onPress={handleChangeExpanded}
        activeOpacity={0.9}
      >
        <View style={[Layout.row]}>
          <View style={[Layout.fill, Layout.row]}>
            {workload.Status == Config.WORKLOAD_STATUS.COMPLETED ? null : (
              <View style={styles.mainCheckbox}>
                <CheckItem
                  onChangeValue={handleWorkloadItemSelectToggle}
                  value={selected}
                  isContainerClickable={true}
                />
              </View>
            )}
            <View style={[Layout.fill, Layout.column]}>
              <View style={[Layout.row]}>
                <View style={[{ flex: 2.5, borderWidth: 0 }]}>
                  <Text
                    style={[Fonts.textTinyBold]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {workload.Address}
                  </Text>
                </View>
                <View>
                  <Text style={[Fonts.textTiny]}>
                    {moment(workload?.Deadline).format('HH[h] mm[min]')}
                  </Text>
                </View>
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
              <View style={[Layout.row]}>
                <Text style={[Fonts.textTiny]}>
                  {workload.PostCode} {workload.City}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {workload.Detail && expanded && _renderSubItem(workload.Detail)}
    </>
  );
}
const propsAreEqual = (prev, next) => {
  return prev.workload.Status === next.workload.Status;
  // return prev.isSelected === next.isSelected
};
export default memo(WorkloadItem, propsAreEqual);
