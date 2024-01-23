import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import _ from 'lodash';
import { useAppDispatch, useTheme } from '@/hooks';

import getStyles from './style';
import {
  FabAction,
  FilterModal,
  SortModal,
  Header,
  SearchBox,
  ToggleButton,
  WorkloadItem,
} from '@/components';
import { Config } from '@/config';
import produce from 'immer';
import { useDispatch, useSelector } from 'react-redux';
import { workloadSelected } from '@/store/workload';
import { wp } from '@/utils/layout-scaling';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import FabActionList from '@/components/Workload/FabActionList';
import { navigate } from '@/navigators/Root';
import { useAppSelector } from '@/hooks';
import { workloadSelector } from '@/store/workload';
import {
  myWorkloads,
  startWorkload,
  endWorkload,
  deleteWorkload,
} from '@/store/workload/workloadApi';

interface WorkloadFilter {
  Type: number[];
  Status: string[];
  Sort: number;
  Term: string;
}
interface WorkloadResult {
  filter: WorkloadFilter;
  result: any[];
}

function WorkloadScreen() {
  const { Colors, Common, Layout, Images, Gutters } = useTheme();
  const styles = getStyles(Colors, Layout);
  const { workloadData: workloadList, isLoading } =
    useAppSelector(workloadSelector);
  const filterModelRef = useRef(null);
  const sortModelRef = useRef(null);
  const actionModelRef = useRef(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(myWorkloads());
  }, []);
  let intitalData: WorkloadResult = {
    filter: {
      Type: [],
      Status: [],
      Term: '',
      Sort: 3,
    },
    result: [],
  };
  let selectedWorloads = useSelector((state: any) => {
    return state.workload.selectedItems;
  });

  const [workloadState, SetWorkloadState] = useState(intitalData);

  useEffect(() => {
    console.log('workload-useeffect', workloadList);
    SetWorkloadState({ ...workloadState, result: workloadList });
  }, [workloadList]);

  // useEffect(() => {
  //   console.log('effect updated state', workloadState)
  // }, [workloadState])
  //Search filter
  const contains = (item: any, filter: WorkloadFilter) => {
    const { Address, Name, PostCode, Phone, Detail, Status, Type } = item;
    const query = filter.Term?.toLowerCase();
    let isExist = _.filter(Detail, item => {
      return item.KolliNumber?.toLowerCase().includes(query);
    });
    let isStatus =
      filter.Status && filter.Status.length > 0
        ? _.indexOf(filter.Status, Status) != -1
        : true;
    let isType =
      filter.Type && filter.Type.length > 0
        ? _.indexOf(filter.Type, Type) != -1
        : true;

    if (
      (Address?.toLowerCase().includes(query) ||
        Name?.toLowerCase().includes(query) ||
        PostCode?.includes(query) ||
        Phone?.includes(query) ||
        isExist.length > 0) &&
      isStatus &&
      isType
    ) {
      return true;
    }
    return false;
  };
  const doSearch = (filter: WorkloadFilter) => {
    let sortItem =
      Config.FILTER_SORT[
        Config.FILTER_SORT.findIndex(x => x.Id == filter.Sort)
      ];

    const data = _.filter(workloadList, item => {
      return contains(item, filter);
    });
    let sorted = _.orderBy(
      data,
      [sortItem.SortBy],
      sortItem.SortOrder == 'asc' ? 'asc' : 'desc',
    );
    SetWorkloadState({
      ...workloadState,
      filter: filter,
      result: sorted,
    });
    //dispatch(workloadSelected([]))
  };
  const debouncedSearch = _.debounce(doSearch, 10);

  const onSearchText = (term: string) => {
    let filter = workloadState.filter;
    filter.Term = term;
    debouncedSearch(filter);
  };
  const onFilterSelected = (statuses: any) => {
    let filter = workloadState.filter;
    filter.Status = statuses;
    doSearch(filter);
  };

  const handleTypeToggle = (id: number) => {
    const isTypeExist =
      workloadState.filter.Type.findIndex((item: number) => item === id) > -1;
    let choosed: any = [];
    if (!isTypeExist) {
      const addedTodosArray = produce(
        workloadState.filter.Type,
        (draft: any) => {
          draft.push(id);
        },
      );
      choosed = addedTodosArray;
    } else {
      const remainingItems = produce(
        workloadState.filter.Type,
        (draft: any) => {
          const index = draft.findIndex((item: number) => item === id);
          if (index !== -1) {
            draft.splice(index, 1);
          }
        },
      );
      choosed = remainingItems;
    }

    let filter = workloadState.filter;
    filter.Type = choosed;
    console.log('current filter', filter);
    doSearch(filter);
  };
  const handleSortToggle = (item: any) => {
    let sorted = _.orderBy(workloadState.result, [item.SortBy], item.SortOrder);
    let filter = workloadState.filter;
    filter.Sort = item.Id;
    SetWorkloadState({
      ...workloadState,
      filter: filter,
      result: sorted,
    });
  };
  let choosed: any = [];
  const onItemToggle = (item: any, isSelected: boolean) => {
    if (isSelected) {
      const addedTodosArray = produce(choosed, draft => {
        draft.push({ ...item, isSelected: isSelected });
      });
      choosed = addedTodosArray;
    } else {
      const remainingItems = produce(choosed, draft => {
        const index = draft.findIndex((todo: any) => todo.Id === item.Id);
        if (index !== -1) {
          draft.splice(index, 1);
        }
      });
      choosed = remainingItems;
    }

    dispatch(workloadSelected(choosed));
  };

  const onRefresh = useCallback(async () => {
    dispatch(myWorkloads());
  }, []);
  //end search item
  const onStartWorkload = () => {
    var items = selectedWorloads;
    console.log(items);

    if (!items || items.length <= 0) {
      return;
    }
    let data = items.map(x => {
      return {
        WorkloadGuId: x.Guid,
        KTId: x.KTId,
        KolliIds: x.Detail.map(y => y.KolliId),
      };
    });
    let model = {
      StartLocation: 'my location',
      WorkloadInfo: data,
    };
    console.log('start model', model);

    dispatch(startWorkload(model));
    setTimeout(() => {
      dispatch(myWorkloads());
    }, 0);

    // dispatch(workloadSelected([]));
    // let resetStatus = filterStatus.map(x => {
    //   return {
    //     Id: x.Id,
    //     Title: x.Title,
    //     Selected: false,
    //   }
    // })
    //SetFilterStatus(prev => [...resetStatus])
    //onClose()
  };
  const onEndWorkload = items => {
    items = selectedWorloads;
    if (!items || items.length <= 0) {
      return;
    }
    let data = items.map(x => {
      return {
        WorkloadGuId: x.Guid,
        KTId: x.KTId,
        ProjectId: x.ProjectId,
        KolliInfo: x.Detail,
        Status: x.Status,
      };
    });
    // onClose()
    console.log('end workload', data);
    dispatch(myWorkloads());

    // dispatch(barcodeScanner([]))
    // navigate('WorkloadEnd', { data: data });
    navigate('EndworkloadProductHistory', { data: data });
  };
  const _deleteWorkload = () => {
    var array: number[] = [];
    selectedWorloads.map((item: { id: number }) => {
      array.push(item.Id);
    });
    let Id = array.join();
    const parsedArray = Id.split(',').map(Number);
    const payload = {
      Id: parsedArray,
    };
    dispatch(deleteWorkload(payload));
    dispatch(myWorkloads());
  };
  const renderItem = ({ item, index }) => {
    const isSelected = selectedWorloads.findIndex(x => x.Id === item.Id);

    return (
      <WorkloadItem
        workload={isSelected > -1 ? selectedWorloads[isSelected] : item}
        index={index}
        onToggle={onItemToggle}
      />
    );
  };
  //Render items
  // const renderItemCall = useCallback(({ item, index }) =>
  //   renderItem({ item, index }),
  // )
  const _renderList = () => {
    return (
      <FlatList
        data={workloadState.result}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={renderItem}
        keyExtractor={item => item.Id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      />
    );
  };
  const _renderFilterType = () => {
    return (
      <View style={[Layout.row, Layout.fill, styles.ItemWrapper]}>
        {Config.FILTER_TYPE.map(item => (
          <ToggleButton
            key={item.Id}
            onPress={handleTypeToggle}
            value={item.Id}
            text={item.Title}
            checked={item.Selected}
            style={styles.filters}
          />
        ))}
      </View>
    );
  };

  const _renderFilterStatusButton = () => {
    let isFilter = workloadState.filter.Status.length > 0;
    return (
      <TouchableOpacity
        style={[Layout.column, Layout.center, Common.wcagArea]}
        onPress={openFilter}
        activeOpacity={0.8}
      >
        <View style={[styles.filterContainer, styles.filterIconSpacing]}>
          {!isFilter ? (
            <SvgXml xml={Images.FilterIcon} width={wp(18)} height={wp(18)} />
          ) : (
            <>
              <View style={[styles.selectedFilter]} />
              <SvgXml
                xml={Images.SelectedFilterIcon}
                width={wp(18)}
                height={wp(18)}
              />
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const _renderSortMenu = () => {
    return (
      <TouchableOpacity onPress={openSort}>
        <FontAwesome
          name="exchange"
          style={[{ transform: [{ rotate: '90deg' }] }]}
          size={18}
          color={Colors.primaryTextColor}
        />
      </TouchableOpacity>
    );
  };

  const openFilter = () => {
    filterModelRef.current.open();
  };
  const openSort = () => {
    sortModelRef.current.open();
  };

  const openActionModel = () => {
    actionModelRef.current.open();
  };

  const myconsole = () =>
    console.log('rendering workload-yasir', workloadState.result);

  const render = () => {
    return (
      <>
        <Header
          title="Workload List"
          titleMessage=""
          rightAction={_renderSortMenu()}
        />
        <View style={[Layout.fill, Common.contentWrapper]}>
          <SearchBox placeholder="Search workloads" onSearch={onSearchText} />
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.appColor} />
          ) : (
            <>
              <View style={[Layout.row, Gutters.mediumHMargin, Layout.center]}>
                {_renderFilterType()}
                {_renderFilterStatusButton()}
              </View>
              <View style={[Layout.row]}>{_renderList()}</View>
            </>
          )}
        </View>
        <FilterModal ref={filterModelRef} onSelected={onFilterSelected} />
        <SortModal
          ref={sortModelRef}
          onSelected={handleSortToggle}
          selected={workloadState.filter.Sort}
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
      </>
    );
  };

  return <CustomSafeArea>{render()}</CustomSafeArea>;
}

export default WorkloadScreen;
