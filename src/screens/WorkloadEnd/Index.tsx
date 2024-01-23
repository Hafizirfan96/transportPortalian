import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
// import { Container, useToast } from 'native-base'
import { useTheme, useAppSelector, useAppDispatch } from '@/hooks';
import { Tag, Additionalproperty, SearchBox } from '@/components';
import { barcodeScanner } from '@/store/barcodeScanner';
import { navigateBack, navigate } from '@/navigators/Root';
import { wp, hp } from '@/utils/layout-scaling';

import _ from 'lodash';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { productSelector } from '@/store/product';
import { getAllProductss } from '@/store/product/productInfo';
import { endWorkload, myWorkloads } from '@/store/workload/workloadApi';

const WorkloadEndScreen = ({ route }) => {
  // console.log('route par----', route);
  const { Common, Layout, Fonts, Colors, Gutters, Images } = useTheme();
  const styles = getStyles(Colors);

  const [worlkloadListScane, setWorkloadListScane] = useState([]);
  const [projects, SetProjects] = useState('');
  const { isLoading: isProductListLoading, allProduct: productList } =
    useAppSelector(productSelector);
  const dispatch = useAppDispatch();

  const payload = {
    CurrentPage: '1',
    PageSize: '10',
    SortOrder: 'Asc',
    SearchTerm: '',
    SortBy: '',
  };
  useEffect(() => {
    // dispatch(productLists(payload));
    dispatch(getAllProductss(payload));
  }, []);

  const productModalRef = useRef(null);
  const openProductModal = (value: any) => {
    console.log('openPRoduct', value);
    productModalRef.current?.setSelectedValue(value);
    productModalRef.current?.open();
  };
  //const { status: productListStatus, data: productList } = useProducts(projects)
  //const mutation = endWorkload()
  //const Toast = useToast()
  //console.log('mutation : ', mutation)

  // //let productList = []
  // const isProductListLoading = productListStatus == 'loading'
  // const isEndWorkloadLoading = useSelector((state) => {
  //   return state.workload.endLoading
  // })
  // // const isEndWorkloadData = useSelector((state) => {
  // //   return state.workload.endData
  // // })
  // const workloadListdata = useSelector((state) => {
  //   return state.workload.workLoadList
  // })
  // const barcodeScaneData = useSelector((state) => {
  //   return state.barcodeScanner.scaneKolliNumber
  // })

  // console.log('workloadlistdata: ', workloadListdata)
  // const dispatch = useDispatch()
  useEffect(() => {
    if (route.params?.data) {
      let projects = _.join(
        _.uniq(route.params?.data.map(item => item.ProjectId)),
        ',',
      );
      console.log(projects);
      //dispatch(fetchWLProducts(projects))
      // SetProjects(projects);
      setWorkloadListScane(previous => {
        return [...previous, ...route.params.data];
      });
    }
  }, [route.params?.data]);

  // useEffect(() => {
  //   if (barcodeScaneData?.data) {
  //     const data = [...workloadListdata]
  //     const workloadListItem = []
  //     for (let i = 0; i < data.length; i++) {
  //       for (let j = 0; j < data[i].KolliInfo.length; j++) {
  //         if (data[i].KolliInfo[j].KolliNumber == barcodeScaneData.data) {
  //           workloadListItem.push(data[i])
  //           break
  //         }
  //       }
  //     }

  //     console.log('workloadListItem: ', workloadListItem)
  //     let filterworkload = []
  //     if (workloadListItem?.length > 0) {
  //       filterworkload = worlkloadListScane.filter((item) => {
  //         return item.WorkloadGuId == workloadListItem[0].WorkloadGuId
  //       })
  //     }

  //     if (workloadListItem?.length == 0) {
  //       Toast.show({
  //         title: 'Info',
  //         description: 'Scanned but not found workload!',
  //         placement: 'bottom',
  //         status: 'warning',
  //       })
  //     }
  //     if (workloadListItem?.length > 0 && filterworkload?.length > 0) {
  //       Toast.show({
  //         title: 'Info',
  //         description: 'Alread Scanned!',
  //         placement: 'bottom',
  //         status: 'warning',
  //       })
  //     }
  //     if (workloadListItem?.length > 0 && filterworkload?.length == 0) {
  //       Toast.show({
  //         title: 'Info',
  //         description: 'Scanned!',
  //         placement: 'bottom',
  //         status: 'success',
  //       })
  //     }

  //     console.log('filterworkload? :', filterworkload)
  //     if (filterworkload.length == 0) {
  //       console.log('nested if statement')
  //       setWorkloadListScane((previous) => {
  //         return [...previous, ...workloadListItem]
  //       })
  //     }
  //   }
  // }, [barcodeScaneData])

  // useEffect(() => {
  //   if (isEndWorkloadData) {
  //     Toast.show({
  //       text: 'Workload saved successfully!',
  //       buttonText: 'Okay',
  //       position: 'bottom',
  //       type: 'success',
  //     })
  //     navigateBack()
  //   }
  // }, [isEndWorkloadData])

  // useEffect(() => {
  //   console.log('inside Useeffect***** ');
  //   if (mutation.isSuccess) {
  //     console.log('inside if Statment: ');
  //     Toast.show({
  //       title: 'Info',
  //       description: 'Workload saved successfully!',
  //       placement: 'bottom',
  //       status: 'success',
  //     });
  //     dispatch(workloadSelected([]));
  //     navigateBack();
  //   }
  // }, [mutation.isSuccess]);

  const OnbarcodeScan = () => {
    console.log('scan pressed');
    navigate('BarcodeScane');
  };

  const handleSignature = () => {
    console.log('handleSignature');
    const data = [];
    worlkloadListScane?.forEach(items => {
      items.KolliInfo.forEach(item => {
        data.push(item.KolliId);
      });
    });
    console.log('kolliIds----: ', data);
    navigate('Signature', { data: data });
    // navigate('Signature');
  };

  const handleSave = data => {
    // console.log('handle save', data);
    let workloadData = worlkloadListScane?.map((item: any) => {
      return {
        KolliTrackingId: item.KTId,
        Workloadguid: item.WorkloadGuId,
        Status: item.Status,
        KolliIds: item.KolliInfo.map(x => x.KolliId),
      };
    });
    let model = {
      WorkloadEndStatus: data.EndStatus,
      EndLocation: 'End location',
      WorkloadSpecificData: workloadData,
      ProductData: data.Products.map((item: any) => {
        return {
          ProductId: item.product,
          Quantity: item.quantity,
          Comment: '',
        };
      }),
    };

    console.log('final model', model);
    dispatch(endWorkload(model));
    setTimeout(() => {
      dispatch(myWorkloads());
      navigateBack();
    }, 0);
  };

  const onSearchText = (term: string) => {
    console.log('on search text', term);
  };
  // const myconsole = data => console.log('rendering workload tag', data);

  return (
    <CustomSafeArea>
      <View onPress={Keyboard.dismiss} style={[Layout.fill]}>
        {/* <Header title="End Workload" titleMessage="" backPage="Workloads" /> */}
        <Text style={[Fonts.textSmall, Gutters.mediumPlusLMargin]}>
          End workloads from list
        </Text>

        <View
          style={[
            Layout.fill,
            Common.contentWrapper,
            styles.endWorkloadheading,
          ]}
        >
          <View
            style={[
              Layout.row,
              Layout.justifyContentBetween,
              Gutters.smallRMargin,
            ]}
          >
            <View style={[Layout.fill]}>
              <SearchBox placeholder="Search" onSearch={onSearchText} />
            </View>
            <TouchableOpacity onPress={OnbarcodeScan}>
              <Image source={Images.BarcodeIcon} style={styles.imagestyle} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View
              style={[
                Layout.column,
                Gutters.mediumHMargin,
                Gutters.smallVMargin,
              ]}
            >
              <View style={[Layout.row, Layout.flexWrap]}>
                {route.params?.data.map(items => {
                  return items.KolliInfo.map(item => {
                    return <Tag text={item.KolliNumber} key={item.KolliId} />;
                  });
                })}
              </View>
              <View style={[Layout.row]}>
                {isProductListLoading && (
                  <ActivityIndicator size="large" color={Colors.appColor} />
                )}
                {!isProductListLoading && productList && (
                  <>
                    <Additionalproperty
                      products={productList?.Items}
                      onSave={handleSave}
                      OnSignature={handleSignature}
                      openProductModal={openProductModal}
                    />
                  </>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
        {/* <View style={[Common.contentWrapper, styles.marginTop0]}>
          <Endworkloadtab />

          <View
            style={[Layout.row, styles.marginvertical10, { flexWrap: 'wrap' }]}
          >
            {worlkloadListScane?.map(items => {
              return items?.KolliInfo.map(item => {
                return <Tag text={item.KolliNumber} key={item.KolliId} />;
              });
            })}
          </View>
        </View> */}
      </View>
      {/* {!isProductListLoading && productList && (
        <ProductModal
          products={productList[0].Products}
          ref={productModalRef}
          selected={null}
        />
      )} */}
    </CustomSafeArea>
  );
};

const getStyles = (colors: any) =>
  StyleSheet.create({
    marginTop0: {
      marginTop: wp(0),
    },
    marginvertical10: {
      marginVertical: wp(16),
    },
    imagestyle: {
      width: wp(30),
      height: hp(50),
      resizeMode: 'contain',
      marginLeft: wp(10),
    },
    endWorkloadheading: {
      top: wp(8),
    },
  });
export default WorkloadEndScreen;
