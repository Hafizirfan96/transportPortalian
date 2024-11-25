import { useAppSelector, useAppDispatch } from '@/hooks';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  resetFilter,
  setSortFilter,
  setTypeFilter,
  workloadSelected,
  workloadSelector,
} from '@/store/Workload';
import {
  myWorkloads,
  startWorkload,
  deleteWorkload,
} from '@/store/Workload/workloadApi';
// import { WorkloadResult, WorkloadFilter } from '@/interfaces/stateModels/workloadStateModel';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Config } from '@/Config';
// import produce from 'immer';
import { navigate } from '@/navigators/Root';
import useGeolocation from './useGeolocation';
// import { useFocusEffect } from '@react-navigation/native';

export default function () {
  const {
    workloadData,
    selectedItems,
    selectedItemsIndexs,
    filter: globalFilter,
  } = useAppSelector(workloadSelector);
  const [searchText, setSearchText] = useState('');

  const filterModelRef = useRef<any>();
  const sortModelRef = useRef<any>();
  const actionModelRef = useRef<any>();
  const filterTypeRef = useRef<any>();
  const searchRef = useRef<any>();
  const dispatch = useAppDispatch();
  const initializationWorkloads = () => {
    filterModelRef.current.reset();
    sortModelRef.current.reset();
    filterTypeRef.current.reset();
    // searchRef.current.reset();
    dispatch(resetFilter());
    dispatch(myWorkloads());
  };
  const { location } = useGeolocation();

  useEffect(() => {
    initializationWorkloads();
  }, []);
  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(resetFilter());
  //   }, []),
  // );

  let selectedWorloads = useSelector((state: any) => {
    return state.workload.selectedItems;
  });

  const onSearchText = (Term: string) => {
    setSearchText(Term);
    dispatch(setTypeFilter({ ...globalFilter, Term }));
  };

  const onFilterSelected = (statuses: any) => {
    dispatch(setTypeFilter({ ...globalFilter, Status: statuses }));
  };

  const handleTypeToggle = (id: number) => {
    const isTypeExist =
      globalFilter.Type.findIndex((item: number) => item === id) > -1;
    let Type: any = [];
    if (!isTypeExist) {
      Type = [...globalFilter.Type, id];
    } else {
      Type = globalFilter.Type.filter((item: number) => item !== id);
    }
    dispatch(setTypeFilter({ ...globalFilter, Type }));
  };

  const handleSortToggle = (item: any) => {
    dispatch(setSortFilter(item));
  };

  const onItemToggle = (item: any) => {
    dispatch(workloadSelected({ ...item }));
  };

  const filterList = async (status: Number | null) => {
    const filteredItems: any = [];
    await selectedItemsIndexs.forEach(async (itemId: any) => {
      const index = workloadData.findIndex((item: any) => item.Id === itemId);
      if (status === workloadData[index].Status || status === null) {
        filteredItems.push(workloadData[index]);
      }
    });
    return filteredItems;
  };
  const onRefresh = useCallback(async () => {
    initializationWorkloads();
  }, []);
  //end search item

  const onStartWorkload = async () => {
    var items = await filterList(Config.WORKLOAD_STATUS.NEW);
    if (!items || items.length <= 0) {
      return;
    }
    const WorkloadInfo = await Promise.all(
      items.map(async (data: any) => {
        const KolliIds = await Promise.all(
          data.Detail.map((item: any) => {
            return item.KolliId;
          }),
        );
        const response = {
          WorkloadGuId: data.Guid,
          KTId: data.KTId,
          KolliIds: KolliIds,
        };
        return response;
      }),
    );
    let model = {
      StartLocation: location,
      WorkloadInfo: WorkloadInfo,
    };

    dispatch(startWorkload(model));
  };

  const onEndWorkload = async () => {
    var items = await filterList(null);
    navigate('EndworkloadProductHistory', { data: items });
  };

  const _deleteWorkload = () => {
    var array: number[] = [];
    selectedItems.map((item: any) => {
      array.push(item.Id);
    });
    let Id = array.join();
    const parsedArray = Id.split(',').map(Number);
    const payload = {
      Id: parsedArray,
    };
    dispatch(deleteWorkload(payload));
    // dispatch(myWorkloads());
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

  return {
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
    filterTypeRef,
    onStartWorkload,
    onEndWorkload,
    _deleteWorkload,
    searchRef,
    searchText,
  };
}
