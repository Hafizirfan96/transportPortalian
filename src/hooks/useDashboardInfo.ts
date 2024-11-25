import { useAppDispatch, useAppSelector, useTheme } from '@/hooks';
import { dashboardSelector } from '@/store/Dashboard';
import { dashboardScheduleInfo } from '@/store/Dashboard/scheduleInfo';
import { shiftSelector } from '@/store/Shift';
import { useCallback, useEffect, useState } from 'react';
import {
  endShift,
  myStartedShifts,
  startShift,
} from '@/store/Shift/shiftThunk';
import useGeolocation from './useGeolocation';
import { locationSelector } from '@/store/location';

export default function () {
  const dispatch = useAppDispatch();
  const { getLocation, isLocationLoading } = useGeolocation();
  const [localLoading, setloader] = useState(false);

  const { location: location } = useAppSelector(locationSelector);
  const { scheduleInfo, status: scheduleInfoStatus } =
    useAppSelector(dashboardSelector);
  const { myStartShiftData: shiftInfo, isLoading } =
    useAppSelector(shiftSelector);
  const currentHour = new Date().getHours();
  let greetingMessage = '';

  if (currentHour >= 5 && currentHour < 12) {
    greetingMessage = 'Good Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = 'Good Afternoon';
  } else {
    greetingMessage = 'Good Evening';
  }
  const initialization = async () => {
    dispatch(dashboardScheduleInfo());
    dispatch(myStartedShifts());
    await getLocation();
  };
  useEffect(() => {
    initialization();
  }, []);
  const onRefresh = useCallback(() => {
    setloader(true);
    initialization();
    setloader(false);
  }, []);
  const startShifts = async () => {
    await getLocation();
    const data = {
      StartPosition: location ?? '',
      StateDateTime: new Date().toISOString(),
    };
    dispatch(startShift(data));

    // dispatch(setShiftInfo(props.shiftInfo));
    // dispatch(myStartedShifts());
  };
  const endShifts = async () => {
    const data = {
      Id: shiftInfo?.id,
      EndPosition: location ?? '',
      EndDateTime: new Date().toISOString(),
    };
    dispatch(endShift(data));
  };

  return {
    currentHour,
    greetingMessage,
    scheduleInfo,
    scheduleInfoStatus,
    shiftInfo,
    isLoading,
    startShifts,
    endShifts,
    onRefresh,
    isLocationLoading,
    localLoading,
  };
}
