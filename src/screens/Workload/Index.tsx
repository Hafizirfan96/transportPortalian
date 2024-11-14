import React from 'react';
import { View } from 'react-native';
import { FabAction } from '@/components';
import useWorkload from '@/hooks/useWorkload';
import { useAppSelector, useTheme } from '@/hooks';
import { workloadSelector } from '@/store/Workload';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import FabActionList from '@/components/Workload/FabActionList';
import SortMenu from '@/components/Workload/WorkloadInfo/SortMenu';
import { FilterModal, Header, SearchBox, SortModal } from '@/components';
import WorkloadInfo from '@/components/Workload/WorkloadInfo/WorkloadInfo';
import getStyles from './style';

function WorkloadScreen() {
  const { Colors, Layout, Common } = useTheme();
  const { filter: globalFilter } = useAppSelector(workloadSelector);

  const {
    selectedWorloads,
    onItemToggle,
    onRefresh,
    handleTypeToggle,
    openFilter,
    openSort,
    onSearchText,
    filterModelRef,
    onFilterSelected,
    sortModelRef,
    handleSortToggle,
    openActionModel,
    actionModelRef,
    onStartWorkload,
    onEndWorkload,
    _deleteWorkload,
    filterTypeRef,
    searchText,
  } = useWorkload();
  const styles = getStyles(Colors, Layout);

  //Render items
  // const renderItemCall = useCallback(({ item, index }) =>
  //   renderItem({ item, index }),
  // )

  return (
    <CustomSafeArea>
      <View style={[Layout.fill, { backgroundColor: Colors.background }]}>
        <Header
          title="Workload List"
          titleMessage=""
          rightAction={<SortMenu openSort={openSort} />}
        />
        <View style={[Common.gapProperity, Layout.fill, styles.listWrapper]}>
          <SearchBox
            placeholder="Search workloads"
            value={searchText}
            onSearch={onSearchText}
          />

          <WorkloadInfo
            filterTypeRef={filterTypeRef}
            //selectedWorloads={selectedWorloads}
            onItemToggle={onItemToggle}
            handleTypeToggle={handleTypeToggle}
            openFilter={openFilter}
            onRefresh={onRefresh}
          />
        </View>
      </View>

      <FilterModal ref={filterModelRef} onSelected={onFilterSelected} />
      <SortModal
        ref={sortModelRef}
        onSelected={handleSortToggle}
        selected={globalFilter.Sort}
      />

      {selectedWorloads && selectedWorloads.length >= 0 ? (
        <>
          <FabAction
            // startWorkload={onStartWorkload}
            // endWorkload={onEndWorkload}
            openAction={openActionModel}
          />
          <FabActionList
            ref={actionModelRef}
            startWorkload={onStartWorkload}
            endWorkload={onEndWorkload}
            deleteWorkload={_deleteWorkload}
            selectedWorloads={selectedWorloads}
          />
        </>
      ) : null}
    </CustomSafeArea>
  );
}

export default WorkloadScreen;
