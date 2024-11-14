import { useAppDispatch, useAppSelector } from '@/hooks';
import { VehicleLorryModel, listitem } from '@/interfaces';
import { navigate } from '@/navigators/Root';
import { showToast } from '@/store/appState';
import { locationSelector } from '@/store/location';
import { lorriSelector, setselectedIndex } from '@/store/lorry';
import { endLorri, getMyLorries, pickupLorry } from '@/store/lorry/lorryInfo';
import { hp } from '@/utils/layout-scaling';
import { StorageKeys } from '@/utils/localStorage';
import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function (tourVehicleId: any, service: any) {
  const { location } = useAppSelector(locationSelector);

  const lorries: listitem[] = [];
  const [lorry, setLorry] = useState(lorries);
  const searchRef = useRef(null);
  const FlatListRef = useRef(null);
  const desiredYPosition = hp(230);
  const [isFlatListFocused, setIsFlatListFocused] = useState(false);
  const [isSearchBoxFocused, setSearchBoxFocused] = useState(false);
  const [searchText, setSearchText] = useState('');
  const searchQuery: VehicleLorryModel = {
    CurrentPage: 1,
    PageSize: 20,
    SortOrder: 'ASC',
    SortBy: 'Name',
    SearchTerm: '',
    IsLorry: true,
  };
  const dispatch = useAppDispatch();
  const {
    lorryData,
    isLoading,
    isError,
    error,
    vehicleStartData,
    isUpdatingLorry,
  } = useAppSelector(lorriSelector);
  useEffect(() => {}, [lorryData]);
  useEffect(() => {
    dispatch(getMyLorries(searchQuery));
  }, []);
  useEffect(() => {
    if (lorryData?.Items) {
      setLorry(lorryData.Items);
    }
  }, [lorryData?.Items]);
  const onPressSearch = () => {
    console.log('onPressSearch called');
    if (FlatListRef.current) {
      FlatListRef.current.scrollToTop();
      setSearchBoxFocused(false);
    }
  };
  const handleBlur = () => {
    setSearchBoxFocused(true);
  };
  const onFlatlistBlur = () => {
    console.log('onFlatlistBlur');
    setIsFlatListFocused(false);
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
  const onSearchText = (term: string) => {
    setSearchText(term);
    doSearch(term);
  };
  const handleNavigation = (vehicleinfo: any) => {
    navigate('VehicleInspection', vehicleinfo);
  };
  const handleNavigationService = () => {
    navigate('Service', service);
  };

  const lorryStart = (payload: any) => {
    dispatch(setselectedIndex(payload.index));
    const payloads = {
      VehicleId: payload?.VehicleId,
      StartKm: payload.StartKm,
      StartPosition: location,
      TVId: tourVehicleId,
    };
    dispatch(pickupLorry(payloads));
  };
  const lorryEnd = (payload: any) => {
    dispatch(setselectedIndex(payload.index));
    const endVehicles = {
      VehicleId: payload.VehicleId,
      TourVehicleId: payload.TourVehicleId,
      EndKm: 0,
      EndPosition: 'Oslo',
    };

    dispatch(endLorri(endVehicles));
  };

  const onRefresh = useCallback(async () => {
    dispatch(getMyLorries(searchQuery));
  }, []);

  const errorSection = () => {
    if (isError == true) {
      dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: error,
        }),
      );
    }
  };

  return {
    lorryStart,
    lorryEnd,
    lorry,
    isLoading,
    onRefresh,
    isError,
    error,
    errorSection,
    handleNavigation,
    handleNavigationService,
    searchText,
    onSearchText,
    searchRef,
    onPressSearch,
    FlatListRef,
    onFlatlistBlur,
    isFlatListFocused,
    handleBlur,
    isSearchBoxFocused,
  };
}
