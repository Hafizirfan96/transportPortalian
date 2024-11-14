import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import {
  Header,
  VehicleDetailCard,
  SearchBox,
  LorryCard,
  TourItem,
} from '@/components';
import getStyles from './styles';
import { useDispatch } from 'react-redux';
import { navigate } from '@/navigators/Root';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import _ from 'lodash';
import { VehicleLorryModel, listitem } from '@/interfaces';
import {
  getMyLorries,
  endLorri,
  startLorri,
  pickupLorry,
} from '@/store/lorry/lorryInfo';
import { lorriSelector } from '@/store/lorry';
import { storage } from '@/store';
import { StorageKeys } from '@/utils/localStorage';
import ToastMessage from '@/components/Toast';
import { tourInfo } from '@/store/tour/tourInfo';
import { tourSelector } from '@/store/tour';
const ShiftDetails = ({ route }) => {
  // const position = storage.getString(StorageKeys.locationName);

  // const { Fonts, Gutters, Layout, Common, Colors } = useTheme();
  // const dispatch = useAppDispatch();
  // const tours: tourData[] = [];

  // const [tour, setTours] = useState(tours);
  // const { tourData, isLoading } = useAppSelector(tourSelector);

  // useEffect(() => {
  //   dispatch(tourInfo());
  // }, []);
  // useEffect(() => {
  //   if (tourData) {
  //     setTours(tourData);
  //   }
  // }, [tourData, isLoading]);
  // const styles = getStyles(Colors);
  // const onRefresh = useCallback(async () => {
  //   dispatch(tourInfo());
  // }, []);
  // const renderItem = ({ item, index }: { item: any; index: number }) => {
  //   if (item.IsTourActive) {
  //     return (
  //       <TourItem tour={item} tourIndex={index} isActive={item.IsTourActive} />
  //     );
  //   } else return;
  // };
  // const _renderTourList = () => {
  //   return (
  //     <FlatList
  //       data={tour}
  //       renderItem={renderItem}
  //       keyExtractor={item => item.Name}
  //       refreshControl={
  //         <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
  //       }
  //     />
  //   );
  // };

  return null;
  // <CustomSafeArea>
  //   <Header title="Shift Details" backPage="Dashboard" />
  //   <>
  //     <ScrollView>
  //       <View style={[Gutters.smallPadding, Gutters.mediumLPadding]}>
  //         <Text style={[Fonts.textSmallBold]}>Active Missions</Text>
  //       </View>
  //       {_renderTourList()}
  //       <View style={[Gutters.mediumLPadding]}>
  //         <Text style={[Fonts.textSmallBold]}>
  //           Workload and Product Summery
  //         </Text>
  //       </View>
  //     </ScrollView>
  //   </>
  // </CustomSafeArea>
};
export default ShiftDetails;
