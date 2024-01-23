import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Header, VehicleCard, SearchBox } from '@/components';
import _ from 'lodash';
import { navigate } from '@/navigators/Root';
import { useTheme, useAppSelector, useAppDispatch } from '@/hooks';
import { vehicleSelector } from '@/store/vehicle';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { VehicleInfo, VehicleSearchModel } from '@/interfaces';
import {
  startVehicle,
  getMyVehicles,
  endVehicle,
} from '@/store/vehicle/vehicleInfo';
import { storage } from '@/store';
import { StorageKeys } from '@/utils/localStorage';
import Toast from 'react-native-toast-message';
import ToastMessage from '@/components/Toast';
import { shiftSelector } from '@/store/shift';
import { tourSelector } from '@/store/tour';

const VehiclesScreen = () => {
  const { Common, Layout, Gutters } = useTheme();
  const showToast = (error: string) => {
    Toast.show({
      type: 'error',
      text1: 'Error Message',
      text2: error,
    });
  };
  const { myStartShiftData: shiftInfo } = useAppSelector(shiftSelector);
  const { tourData } = useAppSelector(tourSelector);

  if (tourData !== null && undefined) {
    var activeTourGuids: any[] = [];
    for (const item of tourData) {
      if (item.IsTourActive === true) {
        activeTourGuids.push(item.TourGuid);
      }
    }
  }
  const vehicles: VehicleInfo[] = [];
  const [vehicle, setVehicle] = useState(vehicles);
  const searchQuery: VehicleSearchModel = {
    CurrentPage: 1,
    PageSize: 20,
    SortOrder: 'ASC',
    SortBy: 'Name',
    SearchTerm: '',
    IsLorry: false,
  };

  const { vehicleData, isLoading, isError, error, vehicleStartData } =
    useAppSelector(vehicleSelector);

  const position = storage.getString(StorageKeys.locationName);

  const dispatch = useAppDispatch();
  useEffect(() => {}, [vehicles, vehicleData]);
  useEffect(() => {
    dispatch(getMyVehicles(searchQuery));
  }, []);

  useEffect(() => {
    console.log('useEffect statement executed');
    if (vehicleData?.Items) {
      console.log('useEffect if statement executed');
      setVehicle(vehicleData.Items);
    }
  }, [vehicleData?.Items]);

  const handleNavigation = (vehicleinfo: any) => {
    navigate('VehicleDetail', vehicleinfo);
  };
  const vehicleStart = (payload: any) => {
    const startVehicles = {
      VehicleId: payload?.VehicleId,
      StartKm: payload.StartKm,
      StartPosition: position ? position : '',
      ShiftGuid: shiftInfo?.GuId ? shiftInfo?.GuId : null,
      TourGuids: activeTourGuids ? activeTourGuids : null,
    };

    dispatch(startVehicle(startVehicles));
    setTimeout(() => {
      const searchQuery: VehicleSearchModel = {
        CurrentPage: 1,
        PageSize: 20,
        SortOrder: 'ASC',
        SortBy: 'Name',
        SearchTerm: '',
        IsLorry: false,
      };
      dispatch(getMyVehicles(searchQuery));
    }, 0);
  };
  const vehicleEnd = (payload: any, item: any) => {
    const endVehicles = {
      VehicleId: payload.VehicleId,
      TourVehicleId: payload.TourVehicleId,
      EndKm: payload.kmtext,
      EndPosition: 'Oslo',
    };

    dispatch(endVehicle(endVehicles));
    setTimeout(() => {
      const searchQuery: VehicleSearchModel = {
        CurrentPage: 1,
        PageSize: 20,
        SortOrder: 'ASC',
        SortBy: 'Name',
        SearchTerm: '',
        IsLorry: false,
      };
      dispatch(getMyVehicles(searchQuery));
    }, 0);
  };
  const errorSection = () => {
    if (isError == true) {
      showToast(error);
    }
  };

  const onRefresh = useCallback(async () => {
    // setIsLoading(true);
    dispatch(getMyVehicles(searchQuery));
  }, []);

  const doSearch = (term: string) => {
    const formattedQuery = term.toLowerCase();
    const data = _.filter(vehicleData?.Items, item => {
      return contain(item, formattedQuery);
    });
    setVehicle(data);
  };

  const debouncedSearch = _.debounce(doSearch, 10);

  const onSearchVehicle = (term: string) => {
    debouncedSearch(term);
  };

  const contain = (item: any, query: any) => {
    const { Name, RegistrationNumber } = item;
    if (
      Name.toLowerCase()?.includes(query) ||
      RegistrationNumber.toLowerCase()?.includes(query)
    ) {
      return true;
    }
    return false;
  };

  const renderItemCall = useCallback(({ item, index }) =>
    renderItem({ item, index }),
  );

  const renderItem = ({ item, index }) => {
    return (
      <VehicleCard
        vehicle={item}
        index={index}
        handleNavigation={handleNavigation}
        vehicleStart={vehicleStart}
        vehicleEnd={vehicleEnd}
      />
    );
  };

  const _renderVehicleList = () => {
    return (
      <View style={[Gutters.mediumPlusBMargin]}>
        <FlatList
          data={vehicle}
          renderItem={renderItemCall}
          // keyExtractor={(item: VehicleInfo, index: number) => item.VehicleId}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  };

  return (
    <CustomSafeArea>
      <ToastMessage error={error} />
      {isError && errorSection()}

      <Header title="Vehicle" />
      <View style={[Layout.fill, Common.contentWrapper]}>
        <SearchBox placeholder="Search vehicles" onSearch={onSearchVehicle} />
        <View style={[Gutters.tinyVMargin]}>
          {/* {isError && errorSection()} */}
        </View>
        {_renderVehicleList()}
      </View>
    </CustomSafeArea>
  );
};

export default VehiclesScreen;
