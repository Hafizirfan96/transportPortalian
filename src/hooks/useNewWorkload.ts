import { Config } from '@/Config';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { navigateBack } from '@/navigators/Root';
import { newWorkloadSelector } from '@/store/newWorkload';
import {
  createNewWorkloads,
  newWorkload,
} from '@/store/newWorkload/newWorklod';
import { tourSelector } from '@/store/tour';
import { tourInfo } from '@/store/tour/tourInfo';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';

export default function () {
  const dispatch = useAppDispatch();

  const { newWorkloadyData: locations, isLoading } =
    useAppSelector(newWorkloadSelector);
  const { tourData: projects, isLoading: tourLoader } =
    useAppSelector(tourSelector);

  useEffect(() => {
    dispatch(tourInfo());
  }, []);
  useEffect(() => {
    if (projects.length === 0 && !tourLoader) {
      // Alert.alert('You must have atleast one Tour Assign');
      Alert.alert(
        'Tour not Found',
        'ou must have atleast one Tour Assign',
        [
          { text: 'Cancel', onPress: () => navigateBack() },
          { text: 'OK', onPress: () => navigateBack() },
        ],
        { cancelable: false },
      );
      // navigateBack();
    }
  }, [projects]);

  const WORKLOAD_TYPE = Config.WORKLOAD_TYPE;
  var statusNew = Config.WORKLOAD_STATUS.NEW;

  const [address, setaddress] = useState({
    place: '',
    isCompleted: false,
  });

  const [tour, setTour] = useState();

  const route = useRoute<any>();

  const [shipmentData, setShipmentData] = useState();
  useEffect(() => {
    let data: any = route.params?.data;
    setShipmentData(data);
  }, [route]);

  useEffect(() => {
    if (address.isCompleted || address.place.length < 1) return;
    const payload = address.place;
    dispatch(newWorkload(payload));
  }, [address.place]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSaveClick = (data: any) => {
    let payload = {
      ProjectId: projects[0].ProjectId,
      CustomerId: projects[0].CustomerId,
      status: statusNew,
      Type: data.Project,
      ReadyFrom: data.readydate,
      Deadline: data.finishdate,
      SenderAddress: '',
      ReceiverAddress: '',
      // CityName: address.place,
      shipmentData,
    };

    if (data.Project === 'Pickup') {
      payload.SenderAddress = address.place;
    } else {
      payload.ReceiverAddress = address.place;
    }
    dispatch(createNewWorkloads(payload));
  };

  // let defaultFinishDate: Date = projects.map((data: any) => {
  //   return data.EndTime;
  // });
  const defaultFinishDate = new Date();
  const defaultStartDate = new Date();
  // let defaultStartDate: Date = projects.map(data => {
  //   return data.StartTime;
  // });

  return {
    isLoading,
    address,
    setaddress,
    control,
    tour,
    setTour,
    projects,
    WORKLOAD_TYPE,
    errors,
    handleSubmit,
    onSaveClick,
    defaultStartDate,
    defaultFinishDate,
    locations,
  };
}
