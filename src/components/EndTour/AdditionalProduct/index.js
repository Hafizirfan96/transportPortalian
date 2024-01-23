import React, { useState, useRef } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useTheme, useAppSelector } from '@/hooks';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import { wp, hp } from '@/utils/layout-scaling';
import { tourSelector } from '@/store/tour';

import getStyles from './styles';
import CheckItem from '@/components/CheckItem';

const AdditionalProduct = props => {
  const { Layout, Fonts, Colors, Common, Images, FontSize, Gutters } =
    useTheme();
  const { isLoading, status } = useAppSelector(tourSelector);
  const styles = getStyles(Colors, FontSize);
  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }
  const defaultValues = {
    products: [],
  };
  const {
    control,
    handleSubmit,
    // errors,
    getValues,
    trigger,
    formState,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'products', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const [checkedValues, setCheckedValues] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState(PickerItem);

  const handleCommentToggle = (item, status) => {
    if (status) {
      setCheckedValues(current => [...current, item.id]);
    } else {
      // console.log('removed');
      setCheckedValues(current => current.filter(x => x !== item.id));
    }
  };

  const addProductRow = () => {
    append({
      ProductId: getValues('ProductId'),
      Quantity: getValues('Quantity'),
    });
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    remove(index);
  };
  const handleSave = data => {
    let model = {
      Detail: data.products,
    };

    props.tourEnd(model);
  };

  const isError = (index, field) => {
    // console.log('iserror----', index);
    if (errors?.products) {
      if (errors.products[index]) {
        if (errors.products[index][field]) {
          if (errors.products[index][field].message) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const PickerItem = [];

  props.products.forEach(ProjectGroup => {
    ProjectGroup?.Products.forEach(element => {
      if (element.Quantity == 0) {
        PickerItem.push(
          <Picker.Item
            key={element.ProductId}
            label={element.ProductName}
            value={element.ProductId}
          />,
        );
      }
    });
  });
  // const myconsole = data => console.log('rendering product', data);
  return (
    <View style={[styles.marginhorizontal30]}>
      <>
        {fields.length > 0 && (
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              styles.marginbottom15,
            ]}
          >
            <Text numberOfLines={1} style={[styles.textStyleBold]}>
              Additional Prod.
            </Text>
            <Text style={[styles.textStyleSmallBold, styles.quanity]}>
              Quantity
            </Text>
            <Text style={[styles.textStyleSmallBold]}>Comment</Text>
          </View>
        )}

        {fields.map((x, i) => {
          return (
            <View key={x.id}>
              <View style={[Layout.row, styles.marginbottom15]}>
                <Controller
                  control={control}
                  defaultValue={x.ProductId || null}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      style={[
                        isError(i, 'ProductId') && styles.errorItem,
                        styles.controlView,
                      ]}
                    >
                      <Picker
                        mode="dropdown"
                        style={[
                          styles.width150,
                          isError(i, 'ProductId') && styles.errorItem,
                        ]}
                        // selectedValue={selectedLanguage}
                        selectedValue={value}
                        onValueChange={(itemValue, itemIndex) => {
                          onChange(itemValue);
                        }}
                        dropdownIconColor={Colors.white}
                        dropdownIconRippleColor={Colors.white}
                      >
                        <Picker.Item
                          key={0}
                          label={'Select product'}
                          value={''}
                        />

                        {PickerItem}
                      </Picker>
                    </View>
                  )}
                  name={`products[${i}].ProductId`}
                  rules={{
                    required: {
                      value: true,
                      message: 'Select a product',
                    },
                  }}
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        placeholder="0"
                        onChangeText={onChange}
                        value={value}
                        style={[
                          styles.InputText,
                          isError(i, 'Quantity') && styles.errorItem,
                        ]}
                        keyboardType="number-pad"
                        onBlur={onBlur}
                      />
                      <View style={[styles.fontAwism]}>
                        <FontAwesome5 name="sort" />
                      </View>
                    </>
                  )}
                  defaultValue={x.Quantity || null}
                  name={`products[${i}].Quantity`}
                  rules={{
                    required: {
                      value: true,
                      message: 'quantity is required field.',
                    },
                  }}
                />

                <View style={[styles.checkbox]}>
                  <CheckItem
                    onChangeValue={handleCommentToggle}
                    value={false}
                    isContainerClickable={true}
                    colorActive={Colors.appColor}
                    item={x}
                  />
                </View>

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <View style={[styles.errorText]}>
                        <Entypo
                          name="cross"
                          color={Colors.red}
                          onPress={() => handleRemoveClick(i)}
                          size={wp(20)}
                        />
                      </View>
                    </>
                  )}
                  defaultValue={x.Quantity || null}
                  name={`products[${i}].Quantity`}
                  rules={{
                    required: {
                      value: true,
                      message: 'quantity is required field.',
                    },
                  }}
                />
              </View>

              {checkedValues?.includes(x.id) ? (
                <View style={[Layout.row, Layout.fill, styles.marginRight10]}>
                  <Controller
                    control={control}
                    defaultValue={x.comments || null}
                    name={`products[${i}].comments`}
                    // rules={{
                    //   maxLength: {
                    //     value: 250,
                    //     message: 'Comment must be 250 or below character.',
                    //   },
                    // }}
                    // render={({ onChange, onBlur, value }) => (
                    render={({ field: { onChange, onBlur, value } }) => (
                      <>
                        <TextInput
                          style={[styles.commentInputText]}
                          onChangeText={onChange}
                          placeholder="Comment"
                          multiline
                          numberOfLines={8}
                          maxLength={200}
                          textAlignVertical="top"
                          value={value}
                        />
                      </>
                    )}
                  />
                </View>
              ) : null}
            </View>
          );
        })}
      </>
      <View style={[Layout.row, styles.marginBottom30]}>
        <Text style={[styles.textStyleMedium]}>Add Product</Text>
        <TouchableOpacity onPress={handleSubmit(addProductRow)}>
          <Image
            source={Images.fabButtonIcon}
            style={[styles.addButtonStyle]}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(handleSave)}
        style={[Common.button.fullRounded, styles.marginvertical10]}
      >
        {status === 'pending' ? (
          <ActivityIndicator
            size="small"
            color={Colors.white}
            style={Common.button.buttonText}
          />
        ) : (
          <Text style={[Common.button.buttonText, styles.colorwhite]}>
            End Tour
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default AdditionalProduct;
