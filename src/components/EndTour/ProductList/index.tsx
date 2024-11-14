import _ from 'lodash';
import getStyles from './styles';
import { useTheme } from '@/hooks';
import { wp } from '@/utils/layout-scaling';
import CheckItem from '@/components/CheckItem';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductList = (props: any) => {
  const { Layout, Colors, FontSize, Images } = useTheme();
  const styles = getStyles(Colors, FontSize);
  const [isSelected, setSelection] = useState(false);
  const [prod, setProd] = useState(props.product.data);

  useEffect(() => {
    setProd(props.product.data);
  }, [props.product.data]);

  const checkbox = () => {
    setSelection(!isSelected);
  };

  const setProdValue = (key: string, value: string) => {
    prod[key] = {
      ...prod[key],
      value,
      error: prod[key].isRequired ? !!!value : false,
    };
    updateProductById(props.product.ProductId, prod);
  };

  const updateProductById = (productId: number, updatedProperties: any) => {
    props.tours.forEach((group: any) => {
      group.Products.forEach((product: any) => {
        if (product.ProductId === productId) {
          Object.assign(product, { ...product, data: updatedProperties });
          setProd({ ...prod });
        }
      });
    });
  };

  const productQuantity = props.product.Quantity >= 0;
  return (
    <View style={[styles.marginhorizontal30]} key={prod}>
      {productQuantity && (
        <View style={[Layout.row]}>
          <Text numberOfLines={1} style={[styles.ProductItemText]}>
            {props.product.ProductLabel}
          </Text>
          {props.product.IsQuantity === null ? (
            <View style={[Layout.row, styles.InputViewBlur]}>
              <TextInput
                editable={false}
                placeholder="dis.."
                style={[styles.InputText]}
              />
            </View>
          ) : (
            <View
              style={[
                Layout.row,
                styles.InputView,
                prod?.quantity?.error ? [styles.errorItem, styles.error] : '',
              ]}
            >
              <TextInput
                editable={true}
                placeholder="0"
                onChangeText={val => setProdValue('quantity', val)}
                style={[styles.InputText]}
                keyboardType={'number-pad'}
                placeholderTextColor={Colors.black}
              />
            </View>
          )}

          {props.product.IsPrice === null ? (
            <View
              style={[Layout.row, styles.InputViewBlur, { marginLeft: 12 }]}
            >
              <TextInput
                editable={false}
                placeholder="dis.."
                style={[styles.InputText]}
              />
            </View>
          ) : (
            <View
              style={[
                Layout.row,
                styles.InputView,
                { marginLeft: 12 },
                prod?.price?.error ? [styles.errorItem, styles.error] : '',
              ]}
            >
              <TextInput
                editable={true}
                placeholder="0"
                onChangeText={val => setProdValue('price', val)}
                style={[styles.InputText]}
                keyboardType={'number-pad'}
                placeholderTextColor={Colors.black}
              />
            </View>
          )}

          <View style={[styles.InputTextItem]}>
            {props.product.IsComment === null ? (
              <View style={styles.uncheckbox}>
                <MaterialCommunityIcons
                  name="checkbox-blank-off"
                  size={wp(20)}
                  color={Colors.grey}
                />
              </View>
            ) : (
              <View>
                <View
                  style={[
                    styles.comment,
                    Layout.alignSelfCenter,
                    prod?.comment?.error ? styles.errorItem : '',
                  ]}
                >
                  <CheckItem
                    onChangeValue={checkbox}
                    value={isSelected}
                    isContainerClickable={true}
                    colorActive={Colors.appColor}
                    colorInactive={Colors.schedul}
                    Icon={
                      isSelected ? (
                        <Image source={Images.activeCheckBox} />
                      ) : (
                        <Image source={Images.inActiveCheckBox} />
                      )
                    }
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      )}
      {isSelected && (
        <TextInput
          style={[
            styles.commentInputText,
            prod?.comment?.error ? styles.errorItem : '',
          ]}
          onChangeText={val => setProdValue('comment', val)}
          placeholder="Comment"
          multiline
          numberOfLines={8}
          maxLength={200}
          textAlignVertical="top"
        />
      )}
    </View>
  );
};

export default ProductList;
