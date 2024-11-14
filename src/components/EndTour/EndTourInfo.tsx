import React from 'react';
import { useTheme } from '@/hooks';
import ProductList from './ProductList';
import { View, Text } from 'react-native';
import getStyles from '@/screens/EndTour/style';
import AdditionalProduct from './AdditionalProduct';

const EndTourInfo = ({
  control,
  isLoading,
  tourEnd,
  showtoast,
  reference,
  handleSubmit,
  fields,
  remove,
  getValue,
  errors,
  append,
  TourValid,
  tours,
  setTours,
}: {
  control: any;
  productListData: any;
  setProductsDetail: any;
  isLoading: boolean;
  tourEnd: any;
  showtoast: any;
  reference: any;
  handleSubmit: any;
  fields: any;
  remove: any;
  getValue: any;
  errors: any;
  append: any;
  TourValid: boolean;
  setTours: any;
  tours: any;
}) => {
  const { Layout, Colors, FontSize } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const _renderProductList = () => {
    return (
      <>
        {tours &&
          tours?.map((productGroup: any) => {
            return (
              <View key={productGroup.ProjectGroupName} style={styles.bottom}>
                <View
                  style={[
                    Layout.row,
                    Layout.justifyContentBetween,
                    styles.marginhorizontal30,
                    // styles.bottom,
                    styles.top,
                  ]}
                >
                  <Text numberOfLines={1} style={[styles.textStyleBold]}>
                    {productGroup.ProjectGroupName}
                  </Text>
                  <Text style={[styles.textStyleSmallBold, { width: 64 }]}>
                    Quantity
                  </Text>
                  <Text style={[styles.textStyleSmallBold, { width: 60 }]}>
                    Price
                  </Text>
                  <Text style={[styles.textStyleSmallBold, { width: 76 }]}>
                    Comment
                  </Text>
                </View>
                {productGroup?.Products.map((product: any) => {
                  return (
                    <ProductList
                      control={control}
                      errors={errors}
                      product={product}
                      tours={tours}
                    />
                  );
                })}
              </View>
            );
          })}
      </>
    );
  };
  return (
    <>
      {/* {isLoading ? (
        <PageLoader />
      ) : ( */}
      <>
        {_renderProductList()}
        {/* {!isLoading && productListData && ( */}
        <AdditionalProduct
          control={control}
          tourEnd={tourEnd}
          showtoast={showtoast}
          reference={reference}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          getValue={getValue}
          errors={errors}
          fields={fields}
          remove={remove}
          append={append}
          TourValid={TourValid}
          tours={tours}
          setTours={setTours}
        />
        {/* )} */}
      </>
      {/* )} */}
    </>
  );
};

export default EndTourInfo;
