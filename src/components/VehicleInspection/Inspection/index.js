import { useTheme } from '@/hooks';
import React, { useState } from 'react';
import { wp, hp } from '@/utils/layout-scaling';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import Listofoption from '@/components/VehicleInspection/Listofoption/index';

const Inspection = props => {
  const { Images, Layout, Colors } = useTheme();
  const styles = getStyles(Colors);

  const [togglebutton, setTogglebutton] = useState(false);
  const toggleButtonClicked = () => {
    setTogglebutton(!togglebutton);
  };
  return (
    <>
      <View style={[Layout.row, Layout.justifyContentBetween]}>
        <Text style={[styles.itemGroupNameText]}>{props.item.GroupName}</Text>
        {togglebutton ? (
          <TouchableOpacity onPress={toggleButtonClicked}>
            <Image
              source={Images.toggleOn}
              style={styles.togglebutton}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleButtonClicked}>
            <Image
              source={Images.toggleOff}
              style={styles.togglebutton}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {togglebutton &&
        props.item.Questions &&
        props.item.Questions.map(items => {
          return (
            <Listofoption
              key={items.Id}
              id={items.Id}
              text={items.Text}
              setQuestionAnswerDetail={props.setQuestionAnswerDetail}
              questionList={props.questionList}
              name={props.name}
            />
          );
        })}
    </>
  );
};

const getStyles = Colors =>
  StyleSheet.create({
    itemGroupNameText: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(12),
      color: Colors.black,
      marginTop: wp(15),
    },
    togglebutton: {
      width: wp(32),
      height: wp(20),
      marginTop: wp(15),
    },
  });
export default Inspection;
