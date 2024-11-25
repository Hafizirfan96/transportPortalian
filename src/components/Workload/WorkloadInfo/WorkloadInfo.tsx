import React, { useEffect, useState } from 'react';
import FilterType from './FilterType';
import FilterStatus from './FilterStatus';
import WorkloadItem from '../WorkloadItem';
import { FlatList, Image, View } from 'react-native';
import EmptyList from '@/components/EmptyList';
import { useAppSelector, useTheme } from '@/hooks';
import { workloadSelector } from '@/store/Workload';
import AppButton from '@/components/AppButton';
import { RouteOptimizeItem } from '@/components';
import DraggableFlatList from 'react-native-draggable-flatlist';

const WorkloadInfo = (props: any) => {
  const { Layout, Gutters, Images, Common } = useTheme();
  const { workloadData, isLoading, selectedItemsIndexs } =
    useAppSelector(workloadSelector);
  const [data, setData] = useState(workloadData);

  useEffect(() => {
    setData(workloadData);
  }, [workloadData]);

  const renderItem = ({
    item,
    index,
    drag,
    isActive,
  }: {
    item: any;
    index: number;
    drag: any;
    isActive: any;
  }) => {
    const isFirst = index === 0;
    const isLast = index === data?.length - 1;

    return (
      <View key={item.Id}>
        {props.isRouteOptimize ? (
          <WorkloadItem
            key={item.Id}
            workload={item}
            index={index}
            onToggle={props.onItemToggle}
            isSelected={selectedItemsIndexs.includes(item.Id)}
          />
        ) : (
          <RouteOptimizeItem
            key={item.Id}
            workload={item}
            index={index}
            onToggle={props.onItemToggle}
            isSelected={selectedItemsIndexs.includes(item.Id)}
            isFirst={isFirst}
            isLast={isLast}
            onLongPress={drag}
          />
        )}
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
        {props.isRouteOptimize && (
          <FilterStatus openFilter={props.openFilter} />
        )}
      </View>
      {!props.isRouteOptimize && (
        <View
          style={[
            Layout.center,
            Gutters.mediumHMargin,
            Gutters.regularVPadding,
            Common.card,
          ]}
        >
          <Image source={Images.pathRoute} />
          <View style={[Gutters.smallTMargin]}>
            <AppButton title="Optimize" />
          </View>
        </View>
      )}
      <View style={[Gutters.smallTMargin]}>
        {props.isRouteOptimize ? (
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
        ) : (
          <DraggableFlatList
            data={data}
            renderItem={({ item, getIndex, drag, isActive }) => {
              const index = getIndex();
              return renderItem({ item, index, drag, isActive });
            }}
            keyExtractor={item => item.Id.toString()}
            onDragEnd={({ data }) => {
              setData(data);
            }}
            ListEmptyComponent={
              !isLoading ? <EmptyList text="No record is available." /> : null
            }
            ListFooterComponent={<View style={[Gutters.regularBMargin]} />}
          />
        )}
      </View>
    </>
  );
};

export default WorkloadInfo;
