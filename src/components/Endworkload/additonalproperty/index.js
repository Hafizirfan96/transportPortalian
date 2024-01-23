import React, { useRef, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  TextInput,
} from 'react-native';
import { useTheme } from '@/hooks';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { wp, hp } from '@/utils/layout-scaling';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CheckItem from '@/components/CheckItem';
import SelectList from '@/components/Dropdown-select-list';
import Dropdown from '@/components/Dropdown';
import ProductModal from '../productModal';
import DropdownWithModal from '@/components/DropdownWithModal';
import RadioButtonWithText from '@/components/RadioButtonWithText';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import SelectDropdownWithSearch from '@/components/SelectDropdownWithSearch';
const Additionalproperty = props => {
  const { Layout, Fonts, Colors, Common, Images, Gutters } = useTheme();
  const styles = getStyles(Colors);

  const productModalRef = useRef(null);
  console.log('props', props);
  const defaultValues = {
    products: [{ product: '', quantity: '', isComment: false, comment: '' }],
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    formState,
    setValue,
  } = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'products', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const [checkedValues, setCheckedValues] = useState([]);
  const [selected, setSelected] = React.useState('');
  const isEndWorkloadLoading = useSelector(state => {
    return state.workload.endLoading;
  });
  const [endSelected, SetEndStatus] = useState(false);
  const dispatch = useDispatch();

  const handleStatusToggle = (item, status) => {
    console.log('toggle status');
    setValue('', status);
    SetEndStatus(status);
  };

  const handleCommentToggle = (item, status) => {
    if (status) {
      setCheckedValues(current => [...current, item.id]);
    } else {
      console.log('removed');
      setCheckedValues(current => current.filter(x => x !== item.id));
    }
  };
  const addProductRow = () => {
    append({
      product: getValues('product'),
      quantity: getValues('quantity'),
    });
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    remove(index);
  };

  const handleSignature = () => {
    props.OnSignature();
  };

  const handleSave = data => {
    console.log('saving workload', data.products);
    let model = {
      Products: data.products,
      EndStatus: endSelected,
    };
    props.onSave(model);
  };

  const isError = (index, field) => {
    if (errors.products) {
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

  const productRenderItem = (item: any) => {
    console.log('product item', item.item);
    return (
      <View
        style={[Layout.row, Gutters.regularHPadding, Gutters.smallVPadding]}
      >
        <RadioButtonWithText
          text={item.item.ProductName}
          //isChecked={item.item.ProductId == sort}
          //onCheck={() => handleSortToggle(item)}
        />
      </View>
    );
  };

  // const myconsole = data => console.log('rendering product', data);
  return (
    <View
      style={[
        //styles.fill,
        Layout.row,
        Layout.fill,
      ]}
      //nestedScrollEnabled={true}
    >
      <View style={[Layout.fill]}>
        <View style={[Layout.row]}>
          <View style={[Layout.column, Gutters.smallRMargin, { flex: 2 }]}>
            <Text style={[Fonts.textTinyBold]}>Product</Text>
          </View>
          <View style={[Layout.colCenter, Gutters.smallRMargin, { flex: 0.5 }]}>
            <Text style={[Fonts.textTinyBold]}>Qty</Text>
          </View>
          <View style={[Layout.colCenter, Gutters.smallRMargin, { flex: 0.5 }]}>
            <Text style={[Fonts.textTinyBold]}>Cmts</Text>
          </View>
          <View style={[Layout.colCenter, Layout.center, styles.ProducQty]}>
            <Text style={[Fonts.textTinyBold]}>X</Text>
          </View>
          {/* <Text style={styles.fontsizemartics}></Text> */}
        </View>
        <View style={[Gutters.smallBMargin]}>
          {fields.map((x, i) => {
            // myconsole(x);
            return (
              <View key={x.id} style={[Gutters.tinyVMargin]}>
                <View style={[Layout.row]}>
                  <View
                    style={[
                      Layout.colCenter,
                      Gutters.smallRMargin,
                      { flex: 2 },
                    ]}
                  >
                    <Controller
                      control={control}
                      defaultValue={x.product || null}
                      name={`products[${i}].product`}
                      rules={{
                        required: {
                          value: true,
                          message: 'Select a product',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View
                          regular
                          style={[
                            isError(i, 'product') && styles.errorItem,
                            styles.selectProduct,
                          ]}
                        >
                          <SelectDropdownWithSearch
                            data={props.products}
                            defaultButtonText={'Search product'}
                            dropdownIconPosition={'right'}
                            onSelect={(selectedItem, index) => {
                              onChange(selectedItem.Id);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                              // text represented after item is selected
                              // if data array is an array of objects then return selectedItem.property to render after item is selected
                              return selectedItem.Name;
                            }}
                            rowTextForSelection={(item, index) => {
                              // text represented for each item in dropdown
                              // if data array is an array of objects then return item.property to represent item in dropdown
                              return item.Name;
                            }}
                            renderDropdownIcon={isOpened => {
                              return (
                                <FontAwesome
                                  name={
                                    isOpened ? 'chevron-up' : 'chevron-down'
                                  }
                                  color={Colors.primaryTextColor}
                                  size={wp(18)}
                                />
                              );
                            }}
                          />
                        </View>
                      )}
                    />
                  </View>
                  <View
                    style={[
                      Layout.colCenter,
                      Gutters.smallRMargin,

                      { flex: 0.5 },
                    ]}
                  >
                    <Controller
                      control={control}
                      defaultValue={x.quantity || null}
                      name={`products[${i}].quantity`}
                      rules={{
                        required: {
                          value: true,
                          message: 'quantity is required field.',
                        },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <View
                          regular
                          style={[
                            isError(i, 'quantity') && styles.errorItem,
                            styles.textInputWrapper,
                          ]}
                        >
                          <TextInput
                            placeholder="0"
                            onChangeText={onChange}
                            value={value}
                            style={[styles.textInput]}
                            keyboardType="number-pad"
                            onBlur={onBlur}
                          />
                        </View>
                      )}
                    />
                  </View>
                  <View
                    style={[
                      Layout.column,
                      Gutters.smallRMargin,
                      Layout.center,
                      { flex: 0.5 },
                    ]}
                  >
                    <CheckItem
                      onChangeValue={handleCommentToggle}
                      value={false}
                      isContainerClickable={true}
                      colorActive={Colors.appColor}
                      item={x}
                    />
                  </View>

                  <View
                    style={[
                      Layout.center,
                      {
                        flex: 0.3,
                      },
                    ]}
                  >
                    <Entypo
                      name="cross"
                      color={Colors.warning}
                      onPress={() => handleRemoveClick(i)}
                      style={[styles.deleteBtn]}
                      size={wp(20)}
                    />
                  </View>
                </View>

                {checkedValues?.includes(x.id) ? (
                  <View style={[Layout.row, Gutters.smallVMargin]}>
                    <Controller
                      control={control}
                      defaultValue={x.comment || null}
                      name={`products[${i}].comment`}
                      rules={{
                        maxLength: {
                          value: 250,
                          message: 'Comment must be 250 or below character.',
                        },
                      }}
                      render={({ onChange, onBlur, value }) => (
                        <View
                          style={[
                            Layout.fill,
                            Layout.column,
                            Common.itemShadow,
                            isError(i, 'comment') && styles.errorItem,
                          ]}
                        >
                          <TextInput
                            placeholder="Ex: Receiver is not at home"
                            onChangeText={onChange}
                            value={value}
                            maxLength={250}
                            multiline={true}
                            onBlur={onBlur}
                            scrollEnabled={true}
                            style={[Gutters.smallPadding, styles.commentBox]}
                          />
                        </View>
                      )}
                    />
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <Text style={[Fonts.textTinyBold]}>Add Product</Text>
          <TouchableOpacity
            onPress={handleSubmit(addProductRow)}
            style={[Gutters.tinyLMargin]}
          >
            <View style={[Layout.center, styles.addIcon]}>
              <MaterialCommunityIcons
                name="plus"
                color={Colors.primaryTextColor}
                size={wp(18)}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[Layout.row, Gutters.smallVMargin, Layout.alignItemsCenter]}
        >
          <CheckItem
            onChangeValue={(item, selected) =>
              handleStatusToggle(item, selected)
            }
            value={endSelected}
            isContainerClickable={true}
            colorActive={Colors.appColor}
          />
          <Text style={[Fonts.textTinyBold, Gutters.tinyLMargin]}>
            WorkLoad Ended
          </Text>
        </View>
        <View style={[Layout.colCenter]}>
          {isEndWorkloadLoading ? (
            <ActivityIndicator size="large" color={Colors.appColor} />
          ) : (
            <>
              <TouchableOpacity
                style={[Common.button.fullRounded, Gutters.smallBMargin]}
                onPress={handleSignature}
              >
                <Text style={[Fonts.textSmallBold]}>Signature</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[Common.button.fullRounded]}
                onPress={handleSubmit(handleSave)}
              >
                <Text style={[Fonts.textSmallBold]}>Save</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const getStyles = colors =>
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
      width: wp(20),
      height: wp(20),
      borderWidth: 1,
      borderColor: colors.primaryTextColor,
    },
    commentBox: {
      minHeight: 50,
      textAlignVertical: 'top',
      maxHeight: 100,
    },
    ProducQty: {
      flex: 0.3,
    },
  });
export default Additionalproperty;
