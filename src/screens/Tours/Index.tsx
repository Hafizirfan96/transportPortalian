import React, { useCallback, useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, RefreshControl } from 'react-native';
import { useTheme } from '@/hooks';

import { Header, TourItem, SearchBox, TourFab } from '@/components';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { tourInfo, startTour } from '@/store/tour/tourInfo';
import { tourSelector } from '@/store/tour';
import { shiftSelector } from '@/store/shift';
import _ from 'lodash';
import FabActionList from '@/components/Workload/FabActionList';
import TourFebAction from '@/components/Tours/TourFebAction';
import ToastMessage from '@/components/Toast';
import Toast from 'react-native-toast-message';

function ToursScreen() {
  const { Common, Layout, Fonts, Gutters } = useTheme();
  const dispatch = useAppDispatch();

  const initialstate = {
    selected: false,
    payload: {
      ProjectId: null,
      TourId: null,
      CustomerId: null,
    },
  };
  const [cardSelect, setCardselect] = useState(initialstate);
  const { tourData, isLoading, isError, error } = useAppSelector(tourSelector);

  const { myStartShiftData } = useAppSelector(shiftSelector);
  const tours: tourData[] = [];
  const [tour, setTours] = useState(tours);
  useEffect(() => {
    dispatch(tourInfo());
  }, []);

  useEffect(() => {
    if (tourData) {
      setTours(tourData);
    }
  }, [tourData, isLoading]);

  const startTours = (item: any) => {
    const payload = {
      ProjectId: item.payload.ProjectId,
      ShiftId: myStartShiftData ? myStartShiftData.id : null,
      CustomerId: item.payload.CustomerId,
    };
    dispatch(startTour(payload));
    setTimeout(() => {
      dispatch(tourInfo());
    }, 0);
  };

  const endTours = () => {
    dispatch(tourInfo());
  };

  const onRefresh = useCallback(async () => {
    dispatch(tourInfo());
  }, []);

  const contain = (item: any, query: any) => {
    const { Name } = item;
    if (Name.toLowerCase()?.includes(query)) {
      return true;
    }
    return false;
  };
  const doSearch = (term: string) => {
    const formattedQuery = term.toLowerCase();
    const data = _.filter(tourData, item => {
      return contain(item, formattedQuery);
    });

    setTours(data);
  };
  const debouncedSearch = _.debounce(doSearch, 10);
  const onSearchText = (term: string) => {
    debouncedSearch(term);
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TourItem
        tour={item}
        onStart={startTours}
        tourIndex={index}
        setCardselect={setCardselect}
        cardSelect={cardSelect}
        onEnd={endTours}
      />
    );
  };

  const _renderTourList = () => {
    return (
      <FlatList
        data={tour}
        renderItem={renderItem}
        keyExtractor={item => item.Name}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    );
  };
  const actionModelRef = useRef(null);

  const openActionModel = () => {
    actionModelRef.current.open();
  };
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
  return (
    <CustomSafeArea>
      <ToastMessage error={error} />
      {isError && errorSection()}
      <Header title="Tours" titleMessage="" />
      <View style={[Layout.fill, Common.contentWrapper]}>
        <SearchBox placeholder="Search in all tours" onSearch={onSearchText} />
        {myStartShiftData && (
          <View
            style={[
              Gutters.mediumHMargin,
              Gutters.smallTMargin,
              Gutters.smallBMargin,
            ]}
          >
            <Text style={[Fonts.textSmallBold]}>Tour List</Text>
          </View>
        )}

        <View style={[Layout.column, Layout.fill]}>
          {!myStartShiftData ? (
            <View style={[Gutters.mediumHMargin, Gutters.mediumTMargin]}>
              <Text style={[Fonts.textSmallBold]}>
                First you must start the shift to start the tour.
              </Text>
            </View>
          ) : null}
          {/* {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primaryBackground} />
          ) : (
            !isLoading && _renderTourList()
          )} */}
          {_renderTourList()}
          {/* <TourFab
            // startTour={onStartTour}
            // endTour={onEndTour}
            ref={actionModelRef}
            cardSelect={cardSelect}
            openAction={openActionModel}
          /> */}
        </View>
      </View>
      {/* <TourFebAction ref={actionModelRef} /> */}
    </CustomSafeArea>
  );
}

export default ToursScreen;
