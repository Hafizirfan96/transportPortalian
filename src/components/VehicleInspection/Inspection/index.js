import React, { useState } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks';
import Listofoption from '@/components/VehicleInspection/Listofoption/index';
import { wp, hp } from '@/utils/layout-scaling';

const Inspection = props => {
  // console.log('props inspection---', props);
  const { Images, Layout, Colors } = useTheme();
  const styles = getStyles(Colors);

  const [togglebutton, setTogglebutton] = useState(false);
  const toggleButtonClicked = () => {
    setTogglebutton(!togglebutton);
  };
  // const setlistofoption= props.setlistofoption
  return (
    <>
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          styles.marginhorizontal40,
        ]}
      >
        <Text style={[styles.itemGroupNameText]}>{props.item.GroupName}</Text>
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
      {togglebutton &&
        props.item.Questions &&
        props.item.Questions.map(items => {
          return (
            <Listofoption
              key={items.Id}
              id={items.Id}
              text={items.Text}
              // setlistofoption={setlistofoption}
              setQuestionAnswerDetail={props.setQuestionAnswerDetail}
              questionList={props.questionList}
              name={props.name}
              // control={props.control}
              // errors={props.errors}
              // clearErrors={props.clearErrors}
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
      fontSize: hp(14),
      color: Colors.black,
      marginTop: wp(15),
    },
    togglebutton: {
      width: wp(40),
      height: hp(20),
      marginTop: wp(15),
    },
    marginhorizontal40: {
      marginHorizontal: wp(40),
    },
  });
export default Inspection;
