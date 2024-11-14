import { useTheme } from '@/hooks';
import React, { useState } from 'react';
import { wp } from '@/utils/layout-scaling';
import SubTitle from '@/components/SubTitle';
import CheckItem from '@/components/CheckItem';
import { useForm, useFieldArray } from 'react-hook-form';
import RadioButtonWithText from '@/components/RadioButtonWithText';
import AdditionalSearchProduct from '@/components/AdditionalSearchProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
} from 'react-native';

const Additionalproperty = (props: any) => {
  const { Layout, Fonts, Colors, Images, Gutters } = useTheme();
  const styles = getStyles(Colors);

  const defaultValues = {
    products: [{ product: '', quantity: '', isComment: false, comment: '' }],
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'products',
  });
  const [checkedValues, setCheckedValues] = useState([]);

  const [endSelected, SetEndStatus] = useState(false);

  const handleStatusToggle = (item: any, status: boolean) => {
    setValue('', status);
    SetEndStatus(status);
  };

  const handleCommentToggle = (item: any, status: boolean) => {
    if (status) {
      setCheckedValues(current => [...current, item.id]);
    } else {
      setCheckedValues(current => current.filter(x => x !== item.id));
    }
  };
  const addProductRow = () => {
    append({
      product: getValues('product'),
      quantity: getValues('quantity'),
    });
  };

  const handleRemoveClick = (index: number) => {
    remove(index);
  };

  const handleSignature = () => {
    props.OnSignature();
  };

  const handleSave = (data: any) => {
    let model = {
      Products: data.products,
      EndStatus: endSelected,
    };
    props.onSave(model);
  };

  const productRenderItem = (item: any) => {
    return (
      <View
        style={[Layout.row, Gutters.regularHPadding, Gutters.smallVPadding]}
      >
        <RadioButtonWithText text={item.item.ProductName} />
      </View>
    );
  };

  return (
    <View style={[Layout.row, Layout.fill]}>
      <View style={[Layout.fill]}>
        <AdditionalSearchProduct
          control={control}
          errors={errors}
          fields={fields}
          checkBoxValue={id => checkedValues.includes(id)}
          handleCommentToggle={handleCommentToggle}
          handleRemoveClick={handleRemoveClick}
          checkedValues={checkedValues}
          handleSubmit={handleSubmit}
          addProductRow={addProductRow}
          crossDisplay={fields.length > 1}
          Product={'Product'}
          Quantity={'Quantity'}
          Price={'Price'}
          Comments={'Comments'}
          labelDisplay={true}
          fieldNames={{
            product: 'product',
            quantity: 'quantity',
            price: 'price',
            comment: 'comment',
          }}
        />

        <TouchableOpacity
          onPress={() => handleStatusToggle(null, !endSelected)}
          style={[
            Layout.row,
            Gutters.smallVMargin,
            Layout.alignItemsCenter,
            Gutters.smallVPadding,
            styles.workloadEndedWrapper,
          ]}
        >
          <CheckItem
            onChangeValue={(item: any, selected: any) =>
              handleStatusToggle(item, selected)
            }
            value={endSelected}
            isContainerClickable={true}
            colorActive={Colors.appColor}
            colorInactive={Colors.schedul}
            Icon={
              endSelected ? (
                <Image source={Images.activeCheckBox} />
              ) : (
                <Image source={Images.inActiveCheckBox} />
              )
            }
          />
          <Text style={[Fonts.textTinyBold, Gutters.tinyLMargin]}>
            WorkLoad Ended
          </Text>
        </TouchableOpacity>
        <View style={[]}>
          {props.isEndWorkloadLoading && (
            <ActivityIndicator size="large" color={Colors.appColor} />
          )}
          {!props.isEndWorkloadLoading && (
            <>
              <TouchableOpacity
                onPress={handleSignature}
                style={[Layout.row, Layout.alignItemsCenter]}
              >
                <View style={[Gutters.regularRMargin]}>
                  <SubTitle text="Add Signature" />
                </View>
                <View style={[Layout.center, styles.addIcon]}>
                  <MaterialCommunityIcons
                    name="plus"
                    color={Colors.black}
                    size={wp(12)}
                  />
                </View>
              </TouchableOpacity>

              <View style={[Layout.fill]}>
                <TouchableOpacity
                  style={[
                    Gutters.mediumPlusTMargin,
                    Gutters.smallHPadding,
                    Gutters.tinyVPadding,
                    Layout.alignSelfEnd,
                    styles.submitButton,
                  ]}
                  onPress={handleSubmit(handleSave)}
                >
                  <Text style={[Fonts.textSmallBold]}>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    deleteBtn: {
      width: wp(20),
      height: wp(20),
      color: colors.primary,
    },
    errorItem: {
      borderWidth: wp(2),
      borderColor: colors.primary,
      borderLeftColor: colors.primary,
      borderTopColor: colors.primary,
    },
    textInputWrapper: {
      width: wp(40),
      height: wp(37),
      backgroundColor: colors.lightGrey,
      borderRadius: 4,
      borderWidth: 1,
    },
    selectProduct: {
      width: wp(162),
      height: wp(37),
      backgroundColor: colors.lightGrey,
      borderRadius: 4,
      borderWidth: 1,
      marginRight: wp(10),
    },
    textInput: {
      textAlign: 'center',
    },
    addIcon: {
      backgroundColor: colors.primaryBackground,
      borderRadius: wp(20),
      width: wp(15),
      height: wp(15),
    },
    commentBox: {
      minHeight: 50,
      textAlignVertical: 'top',
      maxHeight: 100,
    },
    ProducQty: {
      flex: 0.3,
    },
    workloadEndedWrapper: {
      borderBottomWidth: wp(1),
      borderTopWidth: wp(1),
      borderColor: colors.emptyBorderColor,
    },
    submitButton: {
      backgroundColor: colors.primaryBackground,
      borderRadius: wp(5),
    },
  });
export default Additionalproperty;
