import { useAppSelector } from '@/hooks';
import { navigate } from '@/navigators/Root';
import { newWorkloadSelector } from '@/store/newWorkload';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const initialState: any[] | (() => any[]) = [];

export default function () {
  const { isLoading } = useAppSelector(newWorkloadSelector);

  const [KolliDetail, setList] = useState(initialState);

  const [isModalVisible, setModalVisible] = useState(false);

  // console.log('KolliDetail---', KolliDetail);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendDataToParent = (data: any) => {
    setList(data);
  };

  const onSaveClick = (data: any) => {
    navigate('NewWorkloadShipment', { index: 1, data });
    // navigate('NewWorkloadShipment');
  };

  const handleRemoveClick = (index: any) => {
    const updatedList = [...KolliDetail];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  return {
    control,
    errors,
    toggleModal,
    KolliDetail,
    handleRemoveClick,
    isModalVisible,
    sendDataToParent,
    handleSubmit,
    onSaveClick,
    isLoading,
  };
}
