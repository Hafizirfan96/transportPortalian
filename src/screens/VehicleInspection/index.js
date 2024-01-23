import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  FlatList,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import { Header, Inspection, Damagecontrol } from '@/components';
import { useTheme, useAppDispatch, useAppSelector } from '@/hooks';
import { wp, hp } from '@/utils/layout-scaling';
import {
  getInspection,
  createInspection,
} from '@/store/vehicleInspection/vehicleInspection';
import { vehicleInspectionSelector } from '@/store/vehicleInspection';
import ToastMessage from '@/components/Toast';
import Toast from 'react-native-toast-message';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

const VehicleInspection = ({ navigation, route }) => {
  const { Common, Fonts, Colors, FontSize, Layout, Images, Gutters } =
    useTheme();
  const styles = getStyles(Colors, FontSize);
  const { vehicleInsecctionData: vehicleinspectiondata, isLoading } =
    useAppSelector(vehicleInspectionSelector);
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    // Add your validation rules here
    defaultValues: {
      products: [],
    },
  });
  const [selectedList, setSelectedList] = useState({
    Description: '',
    Km: '',
    VehicleId: route.params.VehicleId,
    QuestionAnswerDetails: [],
  });
  let saveImage = useAppSelector(state => {
    return state.localFileUpload.savingFilesDataImage;
  });

  useEffect(() => {
    if (saveImage?.description !== undefined) {
      setSelectedList(previous => ({
        ...previous,
        Description: saveImage.description,
      }));
    }
  }, [saveImage?.description]);
  const ref_input_field = useRef(null);
  const editableKm = () => {
    ref_input_field.current.focus();
  };

  const onChangeKM = value => {
    setSelectedList(previous => {
      return {
        ...previous,
        Km: value,
      };
    });
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getInspection());
  }, []);

  useEffect(() => {
    const querydata = vehicleinspectiondata;
    console.log('query data get in useEffect ', querydata);
    const QuestionAnswerDetails = [];
    querydata?.forEach(lists => {
      lists.Questions.forEach(question => {
        QuestionAnswerDetails.push({
          Comment: '',
          QuestionId: question.Id,
          QuestionOptionAnswer: 3,
        });
      });
    });
    setSelectedList(previous => {
      return {
        ...previous,
        QuestionAnswerDetails: [...QuestionAnswerDetails],
      };
    });
  }, [vehicleinspectiondata]);

  const setQuestionAnswerDetail = value => {
    setSelectedList(previous => {
      previous.QuestionAnswerDetails = previous?.QuestionAnswerDetails.map(
        list => {
          if (list.QuestionId == value.id) {
            list.Comment = value.comments;
            list.QuestionOptionAnswer = value.status;
          }
          return list;
        },
      );
      console.log('setQuestionAnswerDetail selectedList: ', selectedList);
      return previous;
    });
  };
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Message',
      text2: 'Please select at least on option',
    });
  };

  const postInspectionQuestionAnswer = () => {
    const isTrue = selectedList.QuestionAnswerDetails.every(
      x => x.QuestionOptionAnswer === 3,
    );
    if (!isTrue) {
      dispatch(createInspection(selectedList));
    } else {
      showToast();
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Inspection
        item={item}
        setQuestionAnswerDetail={setQuestionAnswerDetail}
        name="testResult"
        rules={{
          maxLength: 3,
          required: true,
        }}
        questionList={
          selectedList.QuestionAnswerDetails
        } /*setlistofoption={setlistofoption}*/
        // control={control}
        // errors={errors}
        // clearErrors={clearErrors}
      />
    );
  };
  const _renderVehicleInspectionList = () => {
    return (
      <FlatList
        data={vehicleinspectiondata}
        renderItem={renderItem}
        keyExtractor={item => item.GroupName}
      />
    );
  };
  const kilometer = () => {
    return (
      <View
        style={[
          Layout.row,
          Layout.justifyContentBetween,
          Common.itemShadow,
          styles.marginLeftRight,
          styles.height40,
          Gutters.mediumLMargin,
          Gutters.mediumRMargin,
        ]}
      >
        <Text style={[styles.killometerText, Layout.alignSelfCenter]}>
          Killometer
        </Text>

        <View style={[Layout.row]}>
          <TextInput
            ref={ref_input_field}
            style={[styles.kmText]}
            keyboardType="numeric"
            value={selectedList.Km}
            onChangeText={onChangeKM}
            placeholder="0"
            placeholderTextColor={Colors.secondaryTextColor}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={editableKm}>
            <Image
              source={Images.notesIcon}
              style={[
                styles.noteIcon,
                Gutters.smallLMargin,
                Gutters.smallRMargin,
                Gutters.smallTMargin,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ToastMessage />
      <Header title="Vehicle Inspection" backPage="VehicleDetail" />

      <Damagecontrol />
      {kilometer()}
      {_renderVehicleInspectionList()}
      <View style={[styles.marginhorizontal20]}>
        <TouchableOpacity
          onPress={handleSubmit(postInspectionQuestionAnswer)}
          style={[Common.button.fullRounded, styles.marginvertical10]}
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={Colors.white}
              style={Common.button.buttonText}
            />
          ) : (
            <Text style={[Common.button.buttonText, styles.colorwhite]}>
              SUBMIT
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (Colors, fontSize) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.white,
      flex: 1,
    },
    marginvertical10: {
      marginVertical: wp(10),
    },
    marginhorizontal20: {
      marginHorizontal: wp(20),
    },
    colorwhite: {
      color: Colors.black,
    },
    killometerText: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      marginLeft: wp(15),
    },
    kmText: {
      fontFamily: 'OsloSans-Bold',
      color: Colors.black,
      maxWidth: wp(100),
      left: wp(10),
    },
    noteIcon: {
      width: wp(20),
      height: hp(20),
      resizeMode: 'contain',
    },
  });
export default VehicleInspection;
