// import { Input } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Platform } from 'react-native';
import { useTheme } from '@/hooks';
import { wp, hp } from '@/utils/layout-scaling';
import Input from '../Input/Input';
import { useForm, Controller } from 'react-hook-form';

const TextComponent = props => {
  useEffect(() => {
    console.log('route.params?.data: ', props?.totalKollies);
    const kolliess = props?.totalKollies;
    setKollies(kolliess);
  }, [props?.totalKollies]);
  const { Common, Images, Layout, Colors, FontSize, Gutters } = useTheme();
  const styles = getStyles(Colors, FontSize);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onChangeTotalKollies = text => {
  //   console.log('onchange invoke', text);
  //   props.totalKollies(text);
  // };
  const onChangeName = text => {
    console.log('onchange ', text);
    props.enterName(text);
  };

  const [Kollies, setKollies] = useState();

  return (
    <View style={[styles.conatainer]}>
      <Text style={[styles.textStyle]}>Total Kollies</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Total Kollies"
            onChangeText={setKollies}
            value={Kollies}
            onBlur={onBlur}
          />
        )}
        name="Kollies"
        rules={{
          required: {
            value: true,
            message: 'Kollies is required field.',
          },
        }}
        defaultValue={props?.totalKollies}
      />

      <View style={styles.name}>
        <Text style={[styles.textStyle]}>Name </Text>

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View
              style={[
                styles.textContainer,
                Layout.row,
                Layout.center,
                Gutters.smallLPadding,
                Gutters.smallVPadding,
                Gutters.mediumBMargin,
                Platform.OS == 'ios'
                  ? Gutters.smallVPadding
                  : Gutters.tinyVPadding,
              ]}
            >
              <TextInput
                style={[
                  styles.textMessageInput,
                  Gutters.smallPadding,
                  Layout.fill,
                ]}
                onChangeText={onChangeName}
                onBlur={onBlur}
                placeholder="Name"
                editable
              />
            </View>
          )}
          name="Name"
          rules={{
            required: {
              value: true,
              message: 'Name is required field.',
            },
          }}
          defaultValue=""
        />
      </View>
    </View>
  );
};
const getStyles = (Colors, FontSize) =>
  StyleSheet.create({
    conatainer: {
      marginHorizontal: wp(20),
    },
    textStyle: {
      fontFamily: 'OsloSans-Bold',
      fontSize: hp(13),
      color: Colors.text,
      marginTop: wp(20),
      marginBottom: wp(5),
      marginLeft: wp(10),
    },
    InputTextStyle: {
      height: hp(60),
      width: wp(300),
      paddingLeft: wp(10),
      paddingRight: wp(10),
    },
    name: { bottom: 30 },
    textMessageInput: {
      height: Platform.OS == 'ios' ? wp(25) : wp(40),
      fontSize: wp(15),
    },
    textContainer: {
      backgroundColor: Colors.white,
      borderRadius: wp(4),
      elevation: wp(10),
      shadowColor: Colors.black,
    },
  });
export default TextComponent;
