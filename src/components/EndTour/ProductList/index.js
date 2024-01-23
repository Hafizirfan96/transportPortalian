import React, { useState, useEffect, memo } from 'react';
import { Text, View, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useTheme } from '@/hooks';
import getStyles from './styles';
import _ from 'lodash';
const ProductList = props => {
  // console.log('quentity----', props);
  const { Layout, Colors, FontSize } = useTheme();
  const styles = getStyles(Colors, FontSize);
  const [comments, setComment] = useState('');
  const [quantity, setQunatity] = useState('');
  const [isSelected, setSelection] = useState(false);
  // console.log('isSelected----', isSelected);

  useEffect(() => {
    setQunatity(props.product?.Quantity.toString());
  }, [props?.product]);

  const checkbox = () => {
    setSelection(!isSelected);
  };

  const onComment = inputText => {
    console.log('text entered ', inputText);
    const value = {
      id: props.product.ProductId,
      quantity: quantity,
      comment: inputText,
    };
    console.log('setProductsDetail values ', value);
    props.setProductsDetail(value);
    setComment(inputText);
  };

  const debouncedComment = _.debounce(onComment, 1000);

  const Comment = inputText => {
    debouncedComment(inputText);
  };

  const ChangeQuantity = text => {
    console.log('text entered ', text);
    const value = {
      id: props.product.ProductId,
      quantity: text,
      comment: comments,
    };
    // console.log('setProductsDetail-----', value);
    props.setProductsDetail(value);
    setQunatity(text);
  };

  const debouncedQuantity = _.debounce(ChangeQuantity, 1000);

  const onChangeQuantity = text => {
    debouncedQuantity(text);
  };

  const productQuantity = props.product.Quantity >= 0;
  return (
    <View style={[styles.marginhorizontal30]}>
      {productQuantity && (
        <View style={[Layout.row, styles.marginbottom15]}>
          <Text numberOfLines={1} style={[styles.ProductItemText]}>
            {props.product.ProductName}
          </Text>
          <View style={[Layout.row, styles.InputView]}>
            <TextInput
              editable={props.product.IsQuantity}
              placeholder=""
              onChangeText={onChangeQuantity}
              style={[styles.InputText]}
              keyboardType={'number-pad'}
            >
              {quantity}
            </TextInput>

            <View style={[styles.fontAwesm]}>
              <FontAwesome5 name="sort" />
            </View>
          </View>

          <View style={[styles.InputTextItem]}>
            <CheckBox
              status={isSelected ? 'checked' : 'unchecked'}
              value={isSelected}
              onValueChange={checkbox}
              tintColors={{ true: Colors.appColor, false: '' }}
              style={[styles.checkbox]}
            />
          </View>
        </View>
      )}
      {isSelected && (
        <TextInput
          editable={props.product.IsComment}
          style={[styles.commentInputText]}
          onChangeText={Comment}
          placeholder="Comment"
          multiline
          numberOfLines={8}
          maxLength={200}
          textAlignVertical="top"
        >
          {comments}
        </TextInput>
      )}
    </View>
  );
};
const propsAreEqual = (prev, next) => {
  return (
    (prev.product.ProductId === next.product.ProductId) &
    (prev.product.Quantity === next.product.Quantity)
  );
};
export default memo(ProductList, propsAreEqual);

// export default ProductList
