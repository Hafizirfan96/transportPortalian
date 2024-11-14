import { useAppDispatch, useAppSelector } from '@/hooks';
import { isTourValid, tourSelector } from '@/store/tour';
import { vehicleServiceSelector } from '@/store/vehicleService';
import {
  vehiclesService,
  vendorLists,
} from '@/store/vehicleService/vehicleService';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function (vehicle: any) {
  const [typeId, settypeId] = useState(null);

  const dispatch = useAppDispatch();
  const { isLoading: isLoading, vendorList } = useAppSelector(
    vehicleServiceSelector,
  );
  const { TourValid } = useAppSelector(tourSelector);

  useEffect(() => {
    dispatch(vendorLists());
    return () => {
      dispatch(isTourValid(false));
    };
  }, []);

  const handleTypeToggle = (value: any) => {
    settypeId(value);
    dispatch(isTourValid(false));
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onServiceSubmit = async (data: any) => {
    if (typeId && typeId > 0) {
      dispatch(isTourValid(false));
      const payload = {
        Id: 0,
        GuId: '',
        ServiceDate: data.date,
        VendorId: data.VendorId,
        TypeId: typeId,
        VehicleId: vehicle.VehicleId,
        Km: data.Kilometre,
        Description: data.Description,
        Price: data.Price,
        Tags: data.Tags,
        KmForNextService: data.KMForNextService,
        NextServiceDate: data.nextserviceDate,
      };
      dispatch(vehiclesService(payload));
    } else {
      dispatch(isTourValid(true));
    }
  };

  return {
    handleTypeToggle,
    typeId,
    control,
    vendorList,
    errors,
    handleSubmit,
    onServiceSubmit,
    isLoading,
    TourValid,
  };
}
