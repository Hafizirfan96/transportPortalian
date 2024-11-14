import getStyles from './styles';
import React, { useState } from 'react';
import { tourSelector } from '@/store/tour';
import { useTheme, useAppSelector } from '@/hooks';
import { Picker } from '@react-native-picker/picker';
import AdditionalSearchProduct from '@/components/AdditionalSearchProduct';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

const AdditionalProduct = props => {
  const { Layout, Colors, Common, FontSize, Gutters } = useTheme();
  const {
    errors,
    control,
    getValue,
    remove,
    fields,
    handleSubmit,
    append,
    TourValid,
    setTours,
  } = props;
  const { status } = useAppSelector(tourSelector);
  const styles = getStyles(Colors, FontSize);

  const [checkedValues, setCheckedValues] = useState([]);
  const addProductRow = () => {
    append({
      ProductId: getValue('ProductId'),
      Quantity: getValue('Quantity'),
      Price: getValue('Price'),
      Comments: '',
    });
  };

  const handleCommentToggle = (item, status) => {
    if (status) {
      setCheckedValues(current => [...current, item.id]);
    } else {
      // console.log('removed');
      setCheckedValues(current => current.filter(x => x !== item.id));
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    remove(index);
  };
  const handleSave = data => {
    const updatedTours = props.tours.map(group => ({
      ...group,
      Products: group.Products.map(product => ({
        ...product,
        data: {
          price: {
            ...product.data.price,
            error: product.data.price.isRequired
              ? !product.data.price.value
              : false,
          },
          quantity: {
            ...product.data.quantity,
            error: product.data.quantity.isRequired
              ? !product.data.quantity.value
              : false,
          },
          comment: {
            ...product.data.comment,
            error: product.data.comment.isRequired
              ? !product.data.comment.value
              : false,
          },
        },
      })),
    }));

    setTours(updatedTours);
    const hasError = updatedTours.some(group =>
      group.Products.some(product =>
        Object.values(product.data).some(field => field.error),
      ),
    );
    if (!hasError) {
      console.log('call api');
      props.tourEnd(updatedTours, data.products);
    }
  };

  const PickerItem = [];

  if (props.tours) {
    props.tours.forEach(ProjectGroup => {
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
  }

  return (
    <View
      style={[Layout.column, Gutters.mediumHMargin, styles.bottomNeProduct]}
    >
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
        Label1={'Additional Prod.'}
        Label2={'Quantity'}
        Label3={'Comment'}
        labelDisplay={fields.length > 0}
        crossDisplay={true}
        fieldNames={{
          product: 'ProductId',
          quantity: 'Quantity',
          comment: 'Comments',
          price: 'Price',
        }}
      />
      {TourValid && (
        <Text style={styles.toastError}>
          Please use at least one product from each
        </Text>
      )}
      <TouchableOpacity
        onPress={handleSubmit(handleSave)}
        style={[Layout.row, Common.button.fullRounded, styles.marginvertical10]}
      >
        {status === 'pending' || props.isLoading ? (
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
