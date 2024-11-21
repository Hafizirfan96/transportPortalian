import { Config } from '@/config';
import { WorkloadState } from '@/interfaces';
import { WorkloadFilter } from '@/interfaces/stateModels/workloadStateModel';
import _ from 'lodash';

export const createDefaultState: WorkloadState = {
  status: 'idle',
  error: null,
  workloadData: null,
  isLoading: false,
  selectedItemsIndexs: [],
  selectedItems: [],
  hasSelectedItems: false,
  hasNewItems: false,
  defaultWorlLoadData: [],
  workLoadList: [],
  filter: {
    Type: [],
    Status: [],
    Term: '',
    Sort: 3,
  },
};

export const contains = (item: any, filter: WorkloadFilter) => {
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

export const doSearch = (state: WorkloadState, List: any | object | null) => {
  const data = _.filter(List, item => {
    return contains(item, state.filter);
  });
  let sortItem =
    Config.FILTER_SORT[
      Config.FILTER_SORT.findIndex(x => x.Id == state.filter.Sort)
    ];

  let sorted = _.orderBy(
    data,
    [sortItem.SortBy],
    sortItem.SortOrder == 'asc' ? 'asc' : 'desc',
  );
  state.workloadData = sorted;
  state.selectedItemsIndexs = [];
};
export const workloadStatusChange = (
  defaultWorlLoadData: any[],
  workloadData: any[],
  defaultIndex: number,
  index: number,
  Status: number,
) => {
  defaultWorlLoadData[defaultIndex].Status = Status;
  if (index >= 0) {
    workloadData[index].Status = Status;
  }
};
export const updateWorkloadStatus = (
  workloadData: any[],
  defaultWorlLoadData: any[],
  endWorkload: boolean,
  selectedItemsIndexs: any[],
  WorkloadEndStatus: boolean,
) => {
  selectedItemsIndexs.forEach(selectedId => {
    const index = workloadData.findIndex(item => item.Id === selectedId);
    const defaultIndex = defaultWorlLoadData.findIndex(
      item => item.Id === selectedId,
    );
    if (defaultIndex >= 0) {
      if (endWorkload) {
        if (WorkloadEndStatus) {
          workloadStatusChange(
            defaultWorlLoadData,
            workloadData,
            defaultIndex,
            index,
            Config.WORKLOAD_STATUS.COMPLETED,
          );
        }
      } else {
        workloadStatusChange(
          defaultWorlLoadData,
          workloadData,
          defaultIndex,
          index,
          Config.WORKLOAD_STATUS.STARTED,
        );
      }
    }
  });
};

export const handleSelectedItems = (
  selectedItemsIndexs: any[],
  workloadData: any[],
  filter: WorkloadFilter,
) => {
  selectedItemsIndexs.forEach(selectedIndex => {
    const index = workloadData.findIndex(item => item.Id === selectedIndex);
    if (index >= 0) {
      if (
        (filter.Status.length > 0 || filter.Type.length > 0) &&
        !filter.Status.includes(workloadData[index].Status) &&
        !filter.Type.includes(workloadData[index].Type)
      ) {
        workloadData.splice(index, 1);
      }
    }
  });
};

export const checkAndPerformSearch = (
  state: WorkloadState,
  workloadData: any[],
  defaultWorlLoadData: any[],
) => {
  if (workloadData.length === 0) {
    state.filter = createDefaultState.filter;
    state.hasSelectedItems = false;
    doSearch(state, defaultWorlLoadData);
  }
};
