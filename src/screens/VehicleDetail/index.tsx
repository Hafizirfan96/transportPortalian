import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { Header, VehicleDetailCard, SearchBox, LorryCard } from '@/components';
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
import Toast from 'react-native-toast-message';

const VehicleDetailScreen = ({ route }) => {
  const position = storage.getString(StorageKeys.locationName);

  const { Fonts, Gutters, Layout, Common, Colors } = useTheme();

  const styles = getStyles(Colors);
  const lorries: listitem[] = [];
  const [lorry, setLorry] = useState(lorries);
  const searchQuery: VehicleLorryModel = {
    CurrentPage: 1,
    PageSize: 20,
    SortOrder: 'ASC',
    SortBy: 'Name',
    SearchTerm: '',
    IsLorry: true,
  };
  const dispatch = useAppDispatch();
  const { lorryData, isLoading, isError, error } =
    useAppSelector(lorriSelector);
  useEffect(() => {}, [lorries]);

  useEffect(() => {
    dispatch(getMyLorries(searchQuery));
  }, []);
  useEffect(() => {
    console.log('useEffect statement executed');
    if (lorryData?.Items) {
      console.log('useEffect if statement executed');
      setLorry(lorryData.Items);
    }
  }, [lorryData?.Items]);
  const showToast = (error: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error Message',
      text2: error,
    });
  };
  const errorSection = () => {
    if (isError == true) {
      showToast(error);
    }
  };
  const contain = (item: any, query: any) => {
    const { Name } = item;
    if (Name?.toLowerCase()?.includes(query)) {
      return true;
    }
    return false;
  };
  const doSearch = (term: string) => {
    const formattedQuery = term.toLowerCase();
    const data = _.filter(lorryData?.Items, item => {
      return contain(item, formattedQuery);
    });

    setLorry(data);
  };
  const debouncedSearch = _.debounce(doSearch, 10);
  const onSearchText = (term: string) => {
    debouncedSearch(term);
  };

  const handleNavigation = vehicleinfo => {
    navigate('VehicleInspection', vehicleinfo);
  };
  const handleNavigationService = () => {
    navigate('Service', route.params);
  };

  const renderItemCall = useCallback(({ item, index }) =>
    renderItem({ item, index }),
  );
  const lorryStart = (payload: any) => {
    const payloads = {
      VehicleId: payload?.VehicleId,
      StartKm: payload.StartKm,
      StartPosition: position,
      TVId: route.params.TourVehicleId,
    };
    dispatch(pickupLorry(payloads));
    const searchQuery: VehicleLorryModel = {
      CurrentPage: 1,
      PageSize: 20,
      SortOrder: 'ASC',
      SortBy: 'Name',
      SearchTerm: '',
      IsLorry: true,
    };
    dispatch(getMyLorries(searchQuery));
  };
  const lorryEnd = (payload: any) => {
    const endVehicles = {
      VehicleId: payload.VehicleId,
      TourVehicleId: payload.TourVehicleId,
      EndKm: 0,
      EndPosition: 'Oslo',
    };

    dispatch(endLorri(endVehicles));
    const searchQuery: VehicleLorryModel = {
      CurrentPage: 1,
      PageSize: 20,
      SortOrder: 'ASC',
      SortBy: 'Name',
      SearchTerm: '',
      IsLorry: true,
    };
    dispatch(getMyLorries(searchQuery));
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.lorry}>
        <LorryCard
          lorry={item}
          lorryStart={lorryStart}
          lorryEnd={lorryEnd}
          // capacity={item.capacity}
          // distance={item.distance}
          // togglebutton={item.togglebutton}
        />
      </View>
    );
  };
  const onRefresh = useCallback(async () => {
    dispatch(getMyLorries(searchQuery));
  }, []);
  const _renderLorryList = () => {
    return (
      <FlatList
        data={lorry}
        renderItem={renderItemCall}
        // keyExtractor={item => item.Id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    );
  };

  return (
    <CustomSafeArea>
      <ToastMessage error={error} />
      {isError && errorSection()}
      <Header title="Tata Ace" backPage="Vehicles" />

      <View style={[Layout.fill, styles.container]}>
        <>
          <ScrollView>
            <VehicleDetailCard
              vehicleinfo={route.params}
              handleNavigation={handleNavigation}
              handleNavigationService={handleNavigationService}
            />

            <Text style={[Fonts.textRegularBold, Gutters.mediumHMargin]}>
              Select Lorry
            </Text>
            <View style={[Gutters.smallVMargin]}>
              <SearchBox placeholder="Search Vehicle" onSearch={onSearchText} />
            </View>

            {_renderLorryList()}
          </ScrollView>
        </>
      </View>
    </CustomSafeArea>
  );
};
export default VehicleDetailScreen;
