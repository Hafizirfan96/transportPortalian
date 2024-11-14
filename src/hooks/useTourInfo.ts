import { useAppDispatch, useAppSelector } from '@/hooks';
import { tourInfo, startTour } from '@/store/tour/tourInfo';
import { setCurrentTour, tourSelector } from '@/store/tour';
import { shiftSelector } from '@/store/Shift';
import { useCallback, useEffect, useState } from 'react';
import { TourStartRequestModel } from '@/interfaces';
import { navigate } from '@/navigators/Root';
import { showToast } from '@/store/appState';
import { useFocusEffect } from '@react-navigation/native';
import _ from 'lodash';

export default function () {
  const dispatch = useAppDispatch();

  const initialstate = {
    selected: false,
    payload: {
      ProjectId: null as Number | null,
      TourId: null as Number | null,
      CustomerId: null as Number | null,
    },
  };
  const [cardSelect, setCardselect] = useState(initialstate);
  const { tourData, isLoading, isError, isUpdating, error } =
    useAppSelector(tourSelector);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchText, setSearchText] = useState('');

  const { myStartShiftData } = useAppSelector(shiftSelector);
  const tours: (typeof tourData)[] = [];
  const [tour, setTours] = useState(tours);
  useFocusEffect(
    useCallback(() => {
      dispatch(tourInfo());
    }, []),
  );
  useEffect(() => {
    if (!isError) {
      return;
    }
    setSelectedIndex(-1);
  }, [isError]);
  useEffect(() => {
    if (tourData) {
      setTours(tourData);
    }
  }, [tourData, isLoading]);

  const startTours = (item: any) => {
    setSelectedIndex(item.index);
    dispatch(setCurrentTour(item));
    const payload: TourStartRequestModel = {
      ProjectId: item.ProjectId,
      ShiftId: (myStartShiftData ? myStartShiftData.id : null) as number,
      CustomerId: item.CustomerId,
    };
    dispatch(startTour(payload)).then(() => {
      dispatch(tourInfo());
    });
  };

  const isShiftStarted = () => {
    if (!myStartShiftData) {
      dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: 'Please start your shift first.',
        }),
      );
    }
  };

  const endTours = (item: any) => {
    setSelectedIndex(item.index);
    dispatch(setCurrentTour(item));
    navigate('EndTourAndWorkloadHistory', item);
  };

  const onRefresh = useCallback(async () => {
    dispatch(tourInfo());
    setSearchText('');
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
    const data = _.filter(tourData, (item: any) => {
      return contain(item, formattedQuery);
    });
    console.log('data', data);
    setTours(data);
  };
  const debouncedSearch = _.debounce(doSearch, 10);
  const onSearchText = (term: string) => {
    setSearchText(term);
    debouncedSearch(term);
  };

  return {
    cardSelect,
    setCardselect,
    tour,
    isLoading,
    isError,
    error,
    myStartShiftData,
    startTours,
    endTours,
    onRefresh,
    searchText,
    onSearchText,
    isShiftStarted,
    isUpdating,
    selectedIndex,
  };
}
