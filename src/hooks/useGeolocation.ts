import { useAppDispatch } from '@/hooks';
import { useSelector } from 'react-redux';
import { getlocationApi } from '@/store/location/location';
import { RootState } from '@/store';

export default function () {
  const dispatch = useAppDispatch();
  const { isLocationLoading, location } = useSelector(
    (state: RootState) => state.location,
  );
  // useEffect(() => {
  //   getLocation();
  // }, []);
  async function getLocation() {
    dispatch(getlocationApi());
  }

  return {
    location,
    getLocation,
    isLocationLoading,
  };
}
