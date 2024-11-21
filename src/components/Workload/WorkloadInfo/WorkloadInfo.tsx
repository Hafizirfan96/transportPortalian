import React from 'react';
import FilterType from './FilterType';
import FilterStatus from './FilterStatus';
import WorkloadItem from '../WorkloadItem';
import { FlatList, View } from 'react-native';
import EmptyList from '@/components/EmptyList';
import { useAppSelector, useTheme } from '@/hooks';
import { workloadSelector } from '@/store/workload';

const WorkloadInfo = (props: any) => {
  const { Layout, Gutters } = useTheme();
  const { workloadData, isLoading, selectedItemsIndexs } =
    useAppSelector(workloadSelector);

  const renderItem = ({ item, index }: { item: any; index: any }) => {
    return (
      <View key={item.Id}>
        <WorkloadItem
          key={item.Id}
          workload={item}
          index={index}
          onToggle={props.onItemToggle}
          isSelected={selectedItemsIndexs.includes(item.Id)}
        />
      </View>
    );
  };

  return (
    <>
      <View style={[Layout.row, Gutters.mediumHMargin, Layout.center]}>
        <FilterType
          ref={props.filterTypeRef}
          handleTypeToggle={props.handleTypeToggle}
        />
        <FilterStatus openFilter={props.openFilter} />
      </View>
      <View style={[Gutters.tinyTMargin]}>
        <FlatList
          data={workloadData}
          renderItem={renderItem}
          keyExtractor={item => item.Id}
          automaticallyAdjustContentInsets={true}
          refreshing={isLoading}
          onRefresh={props.onRefresh}
          ListEmptyComponent={
            !isLoading ? <EmptyList text="No record is available." /> : null
          }
          ListFooterComponent={<View style={[Gutters.regularBMargin]} />}
        />
      </View>
    </>
  );
};

export default WorkloadInfo;
