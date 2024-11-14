import SubTitle from './SubTitle';
import CheckItem from './CheckItem';
import { wp } from '@/utils/layout-scaling';
import { Controller } from 'react-hook-form';
import React, { useEffect, useRef } from 'react';
import { productSelector } from '@/store/product';
import Entypo from 'react-native-vector-icons/Entypo';
import { getAllProductss } from '@/store/product/productInfo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import SelectDropdownWithSearch from './SelectDropdownWithSearch';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

const AdditionalSearchProduct = ({
  control,
  errors,
  fields,
  handleCommentToggle,
  handleRemoveClick,
  checkedValues,
  handleSubmit,
  addProductRow,
  fieldNames,
  checkBoxValue,
  Product,
  Quantity,
  Price,
  Comments,
  labelDisplay,
  crossDisplay,
}: any) => {
  const dispatch = useAppDispatch();
  const { Layout, Colors, Gutters, Images } = useTheme();
  const styles = getStyles(Colors);
  const dropdownRef = useRef(null);

  const searchProducts = (text = '') => {
    const payload = {
      CurrentPage: 1,
      PageSize: 100,
      SortOrder: 'Asc',
      SearchTerm: text,
      SortBy: '',
    };
    dispatch(getAllProductss(payload));
  };

  const isError = (index: number, field: any) => {
    const productError = errors.products?.[index]?.[field]?.message;
    return !!productError;
  };
  const isNegative = (value: any) => {
    return Number(value) < 0;
  };
  useEffect(() => {
    searchProducts();
  }, []);

  const handleSearch = (text: any) => {
    if (text.length >= 2 || text.length === 0) {
      searchProducts(text);
    }
  };
  const {
    isLoading: isProductListLoading,
    allProduct: productList,
    searchLoading,
  } = useAppSelector(productSelector);
  return (
    <View>
      <View style={[Layout.row, Gutters.tinyBMargin]}>
        {labelDisplay && (
          <>
            <View style={[Gutters.smallTMargin, styles.selectProductLabel]}>
              <SubTitle text={Product} />
            </View>

            <View
              style={[
                Gutters.smallTMargin,
                Gutters.regularRMargin,
                Gutters.smallLMargin,
              ]}
            >
              <SubTitle text={Quantity} />
            </View>
            <View style={[Gutters.smallTMargin, Gutters.mediumPlusRMargin]}>
              <SubTitle text={Price} />
            </View>

            <View style={[Gutters.smallTMargin]}>
              <SubTitle text={Comments} />
            </View>
          </>
        )}
      </View>
      {fields.map((x: any, i: any) => (
        <View key={x.id}>
          <View style={[Layout.row, Gutters.smallBMargin]}>
            <Controller
              control={control}
              defaultValue={x.product || null}
              name={`products[${i}].${fieldNames.product}`}
              rules={{ required: 'Select a product' }}
              render={({ field: { onChange } }) => (
                <View
                  style={[
                    isError(i, fieldNames.product) && styles.errorItem,
                    styles.selectProduct,
                    Layout.justifyContentCenter,
                  ]}
                >
                  <SelectDropdownWithSearch
                    ref={dropdownRef}
                    data={productList?.Items}
                    emptyListMessage="No Product Found"
                    defaultButtonText="Search product"
                    dropdownIconPosition="right"
                    onSelect={selectedItem => onChange(selectedItem.Id)}
                    isItemSelected={(item, selectedItem) =>
                      item.Name === selectedItem.Name
                    }
                    buttonTextAfterSelection={selectedItem => selectedItem.Name}
                    rowTextForSelection={item => item.Name}
                    renderDropdownIcon={isOpened => (
                      <FontAwesome
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={Colors.primaryTextColor}
                        size={wp(12)}
                      />
                    )}
                    onSearch={handleSearch}
                    searchLoading={searchLoading}
                  />
                </View>
              )}
            />

            <View style={[Layout.colCenter]}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value, error } }) => (
                  <View style={[Layout.row]}>
                    <TextInput
                      placeholder="Quant.."
                      placeholderTextColor={Colors.black}
                      onChangeText={text => {
                        let numericValue = text.replace(/[^0-9]/g, '');
                        onChange(numericValue);
                      }}
                      value={value}
                      style={[
                        styles.InputText,
                        isError(i, fieldNames.quantity) || isNegative(value)
                          ? styles.errorItem
                          : null,
                      ]}
                      keyboardType="number-pad"
                      onBlur={onBlur}
                    />
                  </View>
                )}
                defaultValue={x.quantity || null}
                name={`products[${i}].${fieldNames.quantity}`}
                rules={{ required: 'Quantity is required' }}
              />
            </View>
            <View style={[Layout.colCenter]}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value, error } }) => (
                  <View style={[Layout.row]}>
                    <TextInput
                      placeholder="Price"
                      placeholderTextColor={Colors.black}
                      onChangeText={text => {
                        let numericValue = text.replace(/[^0-9]/g, '');
                        onChange(numericValue);
                      }}
                      value={value}
                      style={[
                        styles.InputText,
                        isError(i, fieldNames.price) || isNegative(value)
                          ? styles.errorItem
                          : null,
                      ]}
                      keyboardType="number-pad"
                      onBlur={onBlur}
                    />
                  </View>
                )}
                defaultValue={x.price || null}
                name={`products[${i}].${fieldNames.price}`}
                rules={{ required: 'Price is required' }}
              />
            </View>
            <View style={[Layout.center, Gutters.largeLMargin]}>
              <CheckItem
                onChangeValue={handleCommentToggle}
                value={checkBoxValue(x.id)}
                isContainerClickable={true}
                colorActive={Colors.appColor}
                colorInactive={Colors.schedul}
                item={x}
                Icon={
                  checkBoxValue(x.id) ? (
                    <Image source={Images.activeCheckBox} />
                  ) : (
                    <Image source={Images.inActiveCheckBox} />
                  )
                }
              />
            </View>
            {crossDisplay && (
              <View style={[Layout.center, Gutters.tinyLMargin]}>
                <Entypo
                  name="cross"
                  color={Colors.warning}
                  onPress={() => handleRemoveClick(i)}
                  style={[styles.deleteBtn]}
                  size={wp(20)}
                />
              </View>
            )}
          </View>
          {/* <View style={[Gutters.mediumPlusRMargin]}>
            <SubTitle text="Comments" />
          </View> */}
          {checkedValues?.includes(x.id) && (
            <View style={[Layout.row, Gutters.smallVMargin]}>
              <Controller
                control={control}
                defaultValue={x.comment || null}
                name={`products[${i}].${fieldNames.comment}`}
                rules={{
                  maxLength: {
                    value: 250,
                    message: 'Comment must be 250 characters or fewer',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <View
                    style={[
                      isError(i, 'Comments')
                        ? styles.commeterrorItem
                        : styles.borderColor,
                      Layout.fill,
                    ]}
                  >
                    <TextInput
                      style={[styles.textarea]}
                      onChangeText={onChange}
                      placeholder="Comment"
                      multiline
                      numberOfLines={8}
                      maxLength={200}
                      textAlignVertical="top"
                      value={value}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </View>
      ))}
      <View style={[Layout.row, Layout.alignItemsCenter]}>
        <TouchableOpacity
          onPress={
            fields.length > 0 ? handleSubmit(addProductRow) : addProductRow
          }
          style={[
            Layout.row,
            Layout.alignItemsCenter,
            Layout.justifyContentBetween,
          ]}
        >
          <View style={[Gutters.mediumPlusRMargin]}>
            <SubTitle text="Add Product" />
          </View>
          <View style={[Layout.center, styles.addIcon]}>
            <MaterialCommunityIcons
              name="plus"
              color={Colors.black}
              size={wp(12)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdditionalSearchProduct;

const getStyles = (colors: any) =>
  StyleSheet.create({
    deleteBtn: {
      width: wp(20),
      height: wp(20),
      color: colors.primary,
    },
    errorItem: {
      borderWidth: wp(1),
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
      width: '40%',
      height: wp(35),
      backgroundColor: colors.white,
      borderRadius: wp(5),
      marginRight: wp(7),
    },
    selectProductLabel: {
      width: '40%',
    },
    addIcon: {
      backgroundColor: colors.primaryBackground,
      borderRadius: wp(15),
      width: wp(15),
      height: wp(15),
      borderColor: colors.primaryTextColor,
    },
    commentBox: {
      minHeight: 50,
      textAlignVertical: 'top',
      maxHeight: 100,
    },
    InputText: {
      width: wp(50),
      height: wp(35),
      backgroundColor: colors.white,
      borderRadius: wp(5),
      marginLeft: wp(5),
      padding: wp(6),
      color: colors.black,
    },
    commeterrorItem: {
      borderWidth: wp(2),
      borderColor: colors.red,
      borderLeftColor: colors.red,
      borderTopColor: colors.red,
    },

    borderColor: {
      borderRadius: wp(5),
      backgroundColor: colors.white,
    },
    textarea: {
      height: wp(100),
      fontFamily: 'OsloSans-Bold',
      color: colors.black,
      paddingLeft: wp(10),
      paddingRight: wp(10),
    },
  });
