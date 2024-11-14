import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { showToast } from '@/store/appState';
import { useTourInfo, useTheme } from '@/hooks';
import { Header, SearchBox } from '@/components';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import TourInfoComponent from '@/components/Tours/TourInfo';

function ToursScreen() {
  const {
    cardSelect,
    setCardselect,
    tour,
    isLoading,
    isError,
    error,
    myStartShiftData,
    endTours,
    startTours,
    onRefresh,
    searchText,
    onSearchText,
    isShiftStarted,
    isUpdating,
    selectedIndex,
  } = useTourInfo();

  const { Colors, Layout, Common } = useTheme();
  const dispatch = useDispatch();

  // const actionModelRef = useRef(null);

  // const openActionModel = () => {
  //   actionModelRef.current.open();
  // };

  const errorSection = () => {
    if (isError === true) {
      dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: error,
        }),
      );
    }
  };

  return (
    <CustomSafeArea>
      {isError && errorSection()}

      <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
        <Header title="Tours" titleMessage="" />
        <View style={[Common.gapProperity]}>
          <SearchBox
            placeholder={'Search in all tours'}
            value={searchText}
            onSearch={onSearchText}
          />

          <TourInfoComponent
            myStartShiftData={myStartShiftData}
            isShiftStarted={isShiftStarted}
            startTours={startTours}
            endtour={endTours}
            setCardselect={setCardselect}
            cardSelect={cardSelect}
            tour={tour}
            isLoading={isLoading}
            onRefresh={onRefresh}
            isUpdating={isUpdating}
            selectedIndex={selectedIndex}
          />
        </View>
        {/* {_renderTourList()} */}
        {/* <TourFab
            // startTour={onStartTour}
            // endTour={onEndTour}
            ref={actionModelRef}
            cardSelect={cardSelect}
            openAction={openActionModel}
          /> */}
      </View>
      {/* <TourFebAction ref={actionModelRef} /> */}
    </CustomSafeArea>
  );
}

export default ToursScreen;
