import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  Header,
  Reference,
  ProductList,
  AdditionalProduct,
} from '@/components';
import { useTheme } from '@/hooks';
import { navigateBack } from '@/navigators/Root';
import { wp, hp } from '@/utils/layout-scaling';
import _ from 'lodash';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { productSelector } from '@/store/product';
import { productLists, getProductsWorkload } from '@/store/product/productInfo';
import { endTour, tourInfo } from '@/store/tour/tourInfo';
import ToastMessage from '@/components/Toast';
import Toast from 'react-native-toast-message';
import { tourSelector } from '@/store/tour';

const EndTourScreen = ({ navigation, route }) => {
  const { Common, Fonts, Layout, Colors, FontSize } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const dispatch = useAppDispatch();
  const [selectedList, setSelectedList] = useState({
    TourId: route.params.TourId,
    Reference: '',
    Detail: [],
  });
  const [showtoast, setToast] = useState(false);

  const [reference, setReference] = useState({
    ref: '',
    km: '',
    distance: '',
  });
  const tourId = route.params.TourId;
  const projectId = route.params.ProjectId;

  const payload = {
    TourId: tourId,
    ProjectId: projectId,
  };
  const { productData: productListData } = useAppSelector(productSelector);
  const { isLoading } = useAppSelector(tourSelector);
  const payloadList = {
    CurrentPage: '1',
    PageSize: '20',
    SortOrder: 'Asc',
    SearchTerm: '',
    SortBy: 'Asc',
  };

  useEffect(() => {
    dispatch(productLists(payload));
    dispatch(tourInfo());
  }, []);

  useEffect(() => {
    const querydata = productListData;
    const Detail = [];
    // console.log('Detail in useEffect ', Detail);
    querydata?.forEach(ProjectGroup => {
      ProjectGroup?.Products.forEach(list => {
        if (list.Quantity >= 0) {
          Detail.push({
            Comments: '',
            ProductId: list.ProductId,
            Quantity: list.Quantity,
          });
        }
      });
    });
    setSelectedList(previous => {
      return {
        ...previous,
        Detail: Detail,
      };
    });
  }, [productListData]);

  const setProductsDetail = value => {
    setSelectedList(previous => {
      previous.Detail = previous.Detail.map(list => {
        if (list.ProductId == value.id) {
          list.Comments = value.comment;
          list.Quantity = value.quantity;
        }

        return list;
      });
      return previous;
    });
  };
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error Message',
      text2: 'Please use at least one product',
    });
  };
  const InputReference = text => {
    console.log('onchange invoke', text);
    setReference(previous => {
      return {
        ...previous,
        ref: text,
      };
    });
  };
  const onReferencedebounce = _.debounce(InputReference, 1000);
  const onReference = text => {
    onReferencedebounce(text);
  };

  const Inputkm = text => {
    console.log('onchange invoke', text);
    setReference(previous => {
      return {
        ...previous,
        km: text,
      };
    });
  };
  const onChangeKmdebounce = _.debounce(Inputkm, 1000);
  const onChangeKm = text => {
    onChangeKmdebounce(text);
  };

  const InputDistanceSum = text => {
    console.log('onchange invoke', text);
    setReference(previous => {
      return {
        ...previous,
        distance: text,
      };
    });
  };
  const onSumDistancedebounce = _.debounce(InputDistanceSum, 1000);
  const onSumDistance = text => {
    onSumDistancedebounce(text);
  };
  const tourEnd = modal => {
    const productlist = { ...selectedList };
    productlist.Reference = reference.ref;
    if (modal?.Detail) {
      const additionalProductList = modal;
      productlist.Detail = [
        ...productlist.Detail,
        ...additionalProductList.Detail,
      ];
    }

    const isTrue = productlist.Detail.every(x => x.Quantity === 0);
    if (!isTrue) {
      dispatch(endTour(productlist));
      setTimeout(() => {
        dispatch(tourInfo());
        navigateBack();
      }, 0);
    } else {
      setToast(true);
      showToast();
    }
  };
  const _renderProductList = () => {
    return (
      <>
        {productListData &&
          productListData?.map(productGroup => {
            return (
              <View key={productGroup.ProjectGroupName} style={styles.bottom}>
                <View
                  style={[
                    Layout.row,
                    Layout.justifyContentBetween,
                    styles.marginhorizontal30,
                  ]}
                >
                  <Text numberOfLines={1} style={[styles.textStyleBold]}>
                    {productGroup.ProjectGroupName}
                  </Text>
                  <Text style={[styles.textStyleSmallBold]}>Quantity</Text>
                  <Text style={[styles.textStyleSmallBold]}>Comment</Text>
                </View>
                {productGroup?.Products.map(product => {
                  return (
                    <ProductList
                      key={product.ProductId}
                      product={product}
                      setProductsDetail={setProductsDetail}
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
      <View style={[styles.container]}>
        {showtoast && <ToastMessage />}

        <ScrollView>
          <Reference
            onReference={onReference}
            onChangeKm={onChangeKm}
            onSumDistance={onSumDistance}
            reference={reference}
          />
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.appColor} />
          ) : (
            <>
              {!isLoading && _renderProductList()}
              {!isLoading && productListData && (
                <AdditionalProduct
                  tourEnd={tourEnd}
                  products={productListData}
                  showtoast={showtoast}
                />
              )}
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};
const getStyles = (colors, fontSize) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      height: '100%',
    },
    marginvertical10: {
      marginVertical: wp(10),
    },
    marginhorizontal30: {
      marginHorizontal: wp(30),
    },
    colorwhite: {
      color: colors.white,
    },
    marginBottom15: {
      marginBottom: wp(15),
    },
    textStyleBold: {
      fontFamily: 'OsloSans-Bold',
      color: colors.text,
      marginTop: wp(18),
      width: wp(150),
    },
    textStyleSmallBold: {
      fontFamily: 'OsloSans-Bold',
      color: colors.text,
      marginTop: wp(17),
    },
    bottom: {
      bottom: wp(30),
    },
  });
export default EndTourScreen;
