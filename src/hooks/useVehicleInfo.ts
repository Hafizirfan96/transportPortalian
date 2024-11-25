import { useAppDispatch, useAppSelector } from '@/hooks';
import { VehicleInfo, VehicleSearchModel } from '@/interfaces';
import { navigate } from '@/navigators/Root';
import { storage } from '@/store';
import { shiftSelector } from '@/store/Shift';
import { locationSelector } from '@/store/location';
import { tourSelector } from '@/store/tour';
import { vehicleSelector } from '@/store/vehicle';
import {
  endVehicle,
  getMyVehicles,
  startVehicle,
} from '@/store/vehicle/vehicleInfo';
import { StorageKeys } from '@/utils/localStorage';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import useGeolocation from './useGeolocation';
import { Keyboard } from 'react-native';

export default function () {
  const { myStartShiftData: shiftInfo } = useAppSelector(shiftSelector);
  const { getLocation, isLocationLoading, location } = useGeolocation();
  const { tourData, activeToursIds } = useAppSelector(tourSelector);

  const vehicles: VehicleInfo[] = [];
  const [vehicle, setVehicle] = useState(vehicles);
  const [iskmModalVisible, setKmModal] = useState(false);
  const searchQuery: VehicleSearchModel = {
    CurrentPage: 1,
    PageSize: 20,
    SortOrder: 'ASC',
    SortBy: 'Name',
    SearchTerm: '',
    IsLorry: false,
  };

  const {
    vehicleData,
    isLoading,
    isUpdating,
    isError,
    error,
    vehicleStartData,
  } = useAppSelector(vehicleSelector);
  const position = async () => await storage.getItem(StorageKeys.locationName);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchText, setSearchText] = useState('');
  const [km, setKm] = useState('');

  const dispatch = useAppDispatch();
  useEffect(() => {}, [vehicles, vehicleData]);
  useFocusEffect(
    useCallback(() => {
      getLocation();
      dispatch(getMyVehicles(searchQuery));
    }, []),
  );

  useEffect(() => {
    if (vehicleData?.Items) {
      setVehicle(vehicleData.Items);
    }
  }, [vehicleData?.Items]);

  useEffect(() => {
    if (!isError) return;
    setSelectedIndex(-1);
  }, [isError]);

  const handleNavigation = (vehicleinfo: any) => {
    navigate('VehicleDetail', vehicleinfo);
  };
  const vehicleStart = async (payload: any) => {
    setSelectedIndex(payload.index);
    setKm(payload.LastKm);
    setKmModal(true);
  };
  const vehicleEnd = async (payload: any, item: any) => {
    setSelectedIndex(payload.index);
    setKm(payload.LastKm);
    setKmModal(true);
  };

  const onRefresh = useCallback(async () => {
    // setIsLoading(true);
    setSearchText('');
    dispatch(getMyVehicles(searchQuery));
    await getLocation();
  }, [dispatch]);

  const doSearch = (term: string) => {
    const formattedQuery = term.toLowerCase();
    const data = _.filter(vehicleData?.Items, item => {
      return contain(item, formattedQuery);
    });
    setVehicle(data);
  };

  const debouncedSearch = _.debounce(doSearch, 10);

  const onSearchVehicle = (term: string) => {
    setSearchText(term);
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
  const onChangeKm = (value: string) => {
    const numericText = value.replace(/[^0-9]/g, '');
    setKm(numericText);
  };
  const onSubmitkmModal = async () => {
    Keyboard.dismiss();
    setKmModal(false);
    await getLocation();
    if (vehicle[selectedIndex].IsVehicleActive) {
      const endVehicles = {
        VehicleId: vehicle[selectedIndex].VehicleId,
        TourVehicleId: vehicle[selectedIndex].TourVehicleId,
        EndKm: Number(km),
        EndPosition: location ?? '',
      };

      await dispatch(endVehicle(endVehicles));
    } else {
      const startVehicles = {
        VehicleId: vehicle[selectedIndex].VehicleId,
        StartKm: Number(km),
        StartPosition: location ?? '',
        ShiftGuid: shiftInfo?.GuId ?? null,
        TourGuids: activeToursIds.length > 0 ? activeToursIds : null,
      };
      await dispatch(startVehicle(startVehicles));
    }
    setKm('');
    dispatch(getMyVehicles(searchQuery));
  };
  const onCancelkmModel = () => {
    Keyboard.dismiss();
    setKmModal(false);
    setKm('');
  };
  return {
    vehicle,
    vehicleData,
    isLoading,
    isLocationLoading,
    isError,
    error,
    vehicleStartData,
    position: position(),
    handleNavigation,
    vehicleStart,
    vehicleEnd,
    onRefresh,
    searchText,
    onSearchVehicle,
    isUpdating,
    selectedIndex,
    onCancelkmModel,
    onSubmitkmModal,
    iskmModalVisible,
    onChangeKm,
    km,
  };
}
