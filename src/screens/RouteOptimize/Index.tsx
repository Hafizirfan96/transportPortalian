import React from 'react';
import { View } from 'react-native';
import { useRouteOptimize } from '@/hooks';
import { Header, SearchBox } from '@/components';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import SortMenu from '@/components/Workload/WorkloadInfo/SortMenu';
import WorkloadInfo from '@/components/Workload/WorkloadInfo/WorkloadInfo';

function RouteOptimize() {
  const {
    onItemToggle,
    onRefresh,
    handleTypeToggle,
    openFilter,
    openSort,
    onSearchText,
    filterTypeRef,
    searchText,
  } = useRouteOptimize();

  return (
    <CustomSafeArea>
      <Header
        title="Orders Stop 2"
        rightAction={<SortMenu openSort={openSort} />}
        backPage="Workload"
      />
      <SearchBox
        placeholder="Search workloads"
        value={searchText}
        onSearch={onSearchText}
      />

      <View style={{ flex: 0.7 }}>
        <WorkloadInfo
          filterTypeRef={filterTypeRef}
          onItemToggle={onItemToggle}
          handleTypeToggle={handleTypeToggle}
          openFilter={openFilter}
          onRefresh={onRefresh}
          isRouteOptimize={false}
        />
      </View>
    </CustomSafeArea>
  );
}

export default RouteOptimize;
