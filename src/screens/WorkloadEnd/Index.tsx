import _ from 'lodash';
import { useSelector } from 'react-redux';
import { wp, hp } from '@/utils/layout-scaling';
import { useTheme, useAppDispatch } from '@/hooks';
import useGeolocation from '@/hooks/useGeolocation';
import React, { useState, useEffect, useRef } from 'react';
import { endWorkload } from '@/store/Workload/workloadApi';
import { navigateBack, navigate } from '@/navigators/Root';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { SearchBox, SubTitle, Tag, Additionalproperty } from '@/components';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const WorkloadEndScreen = ({ route }: any) => {
  const { Layout, Colors, Gutters, Images } = useTheme();
  const styles = getStyles(Colors);

  const [worlkloadListScane, setWorkloadListScane] = useState([]);

  const dispatch = useAppDispatch();
  const { location } = useGeolocation();
  const isEndWorkloadLoading = useSelector<any>(state => {
    return state.workload.endLoading;
  });

  const productModalRef = useRef(null);
  const openProductModal = (value: any) => {
    productModalRef.current?.setSelectedValue(value);
    productModalRef.current?.open();
  };

  useEffect(() => {
    if (route.params?.data.length > 0) {
      let projects = _.join(
        _.uniq(route.params?.data.map((item: any) => item.ProjectId)),
        ',',
      );

      setWorkloadListScane(previous => {
        return [...previous, ...route.params?.data];
      });
    }
  }, [route.params?.data]);

  const OnbarcodeScan = () => {
    navigate('BarcodeScane');
  };

  const handleSignature = () => {
    const data: any = [];
    worlkloadListScane?.forEach(items => {
      items.Detail.forEach((item: any) => {
        data.push(item.KolliId);
      });
    });
    navigate('Signature', { data: data });
  };

  const handleSave = (data: any) => {
    let workloadData = worlkloadListScane?.map((item: any) => {
      return {
        KolliTrackingId: item.KTId,
        Workloadguid: item.Guid,
        Status: item.Status,
        KolliIds: item.Detail.map((x: any) => x.KolliId),
      };
    });
    let model = {
      WorkloadEndStatus: data.EndStatus,
      EndLocation: location,
      WorkloadSpecificData: workloadData,
      ProductData: data.Products.map((item: any) => {
        return {
          ProductId: item.product,
          Quantity: item.quantity,
          Comment: '',
        };
      }),
    };

    dispatch(endWorkload(model));
    setTimeout(() => {
      navigateBack();
    }, 0);
  };

  const onSearchText = (term: string) => {};
  return (
    <CustomSafeArea>
      <View style={[styles.whiteSpace]} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[Layout.fill, Gutters.mediumHMargin]}>
          <View style={[Layout.row, Gutters.smallTMargin]}>
            <View style={[Layout.fill, styles.searchWrapper]}>
              <SearchBox
                placeholder="Search workloads"
                onSearch={onSearchText}
                value=""
                padding={true}
              />
            </View>

            <TouchableOpacity
              onPress={OnbarcodeScan}
              style={[styles.imageWrapper, Layout.center, Gutters.smallLMargin]}
            >
              <Image source={Images.barcodeIcon} style={[styles.imagestyle]} />
            </TouchableOpacity>
          </View>
          <View style={[Gutters.smallTMargin]}>
            <SubTitle text="Search results" />
          </View>

          {route.params?.data.length == 0 ? (
            <View>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <ScrollView>
              <View style={[Layout.column, Gutters.smallVMargin]}>
                <View style={[Layout.row, Layout.flexWrap]}>
                  <View
                    style={[
                      Layout.flexWrap,
                      Layout.row,
                      Layout.fullWidth,
                      Gutters.smallHPadding,
                      Gutters.smallBPadding,
                      Gutters.tinyTPadding,
                      styles.kolliWrapper,
                    ]}
                  >
                    {route.params?.data.map((items: any) => {
                      return items.Detail.map((item: any) => {
                        if (item.KolliNumber !== null)
                          return (
                            <Tag text={[item.KolliNumber]} key={item.KolliId} />
                          );
                      });
                    })}
                  </View>
                </View>
                <Additionalproperty
                  onSave={handleSave}
                  OnSignature={handleSignature}
                  openProductModal={openProductModal}
                  isEndWorkloadLoading={isEndWorkloadLoading}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </CustomSafeArea>
  );
};

const getStyles = (Colors: any) =>
  StyleSheet.create({
    imageWrapper: {
      width: wp(45),
      height: wp(45),
      backgroundColor: Colors.white,
      borderRadius: wp(22),
    },
    imagestyle: {
      width: wp(30),
      height: hp(30),
      resizeMode: 'contain',
    },
    endWorkloadheading: {
      top: wp(8),
    },
    whiteSpace: {
      height: wp(5),
      backgroundColor: Colors.white,
    },
    searchWrapper: {
      top: wp(22),
    },
    kolliWrapper: {
      backgroundColor: Colors.white,
      borderRadius: wp(5),
    },
  });
export default WorkloadEndScreen;
