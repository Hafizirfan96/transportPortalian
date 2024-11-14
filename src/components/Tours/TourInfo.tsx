import React from 'react';
import TourItem from './TourItem';
import { useTheme } from '@/hooks';
import EmptyList from '../EmptyList';
import { wp } from '@/utils/layout-scaling';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';

const TourInfoComponent = ({
  startTours,
  setCardselect,
  cardSelect,
  tour,
  isLoading,
  onRefresh,
  endtour,
  isShiftStarted,
  isUpdating,
  selectedIndex,
}: {
  myStartShiftData: any;
  startTours: any;
  setCardselect: any;
  cardSelect: any;
  tour: any;
  isLoading: boolean;
  onRefresh: any;
  endtour: any;
  isShiftStarted: any;
  isUpdating: boolean;
  selectedIndex: number;
}) => {
  const { Colors, Layout } = useTheme();

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <TourItem
        tour={item}
        onStart={startTours}
        endtour={endtour}
        tourIndex={index}
        setCardselect={setCardselect}
        cardSelect={cardSelect}
        isUpdating={selectedIndex == index && isUpdating}
        isShiftStarted={isShiftStarted}
      />
    );
  };

  const _renderTourList = () => {
    return (
      <FlatList
        data={tour}
        renderItem={renderItem}
        contentContainerStyle={[Layout.flexGrow, styles.flatListContent]}
        keyExtractor={item => item.Name}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[Colors.primaryBackground]}
          />
        }
        ListEmptyComponent={
          !isLoading && <EmptyList text="No tour is available." />
        }
      />
    );
  };

  return _renderTourList();
};

export default TourInfoComponent;
const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: wp(170),
  },
});
