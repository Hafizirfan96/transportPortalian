import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { showToast } from '@/store/appState';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { vehicleInspectionSelector } from '@/store/vehicleInspection';
import { createInspection, getInspection } from '@/store/vehicleInspection/vehicleInspection';
import moment from 'moment';

export default function (VehicleId: any) {
  const navigation = useNavigation();
  const { description } = useAppSelector(state => state.appState.registerDamage);
  const { vehicleInsecctionData: vehicleinspectiondata } = useAppSelector(vehicleInspectionSelector);
  const [isLoading, setIsloading] = useState(false);
  const { handleSubmit } = useForm({
    defaultValues: {
      products: [],
    },
  });
  const [selectedList, setSelectedList] = useState({
    Id: 0,
    GuId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    Date: null,
    CompanyId: 0,
    EmployeeId: 0,
    Description: '',
    Km: 0,
    VehicleId: VehicleId,
    QuestionAnswerDetails: [] as any[],
  });
  let saveImage = useAppSelector(state => {
    return state.localFileUpload.savingFilesDataImage;
  });

  useEffect(() => {
    if (saveImage?.description !== undefined) {
      setSelectedList(previous => ({
        ...previous,
        Description: saveImage.description,
      }));
    }
  }, [saveImage?.description]);
  const ref_input_field = useRef<any>();
  const editableKm = () => {
    ref_input_field.current.focus();
  };

  const onChangeKM = (value: any) => {
    setSelectedList(previous => {
      return {
        ...previous,
        Km: value,
      };
    });
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getInspection());
  }, []);

  useEffect(() => {
    const querydata = vehicleinspectiondata;
    const QuestionAnswerDetails = [] as any[];
    querydata?.forEach((lists: any) => {
      lists.Questions.forEach((question: any) => {
        QuestionAnswerDetails.push({
          Comment: '',
          QuestionId: question.Id,
          QuestionOptionAnswer: 3,
        });
      });
    });
    setSelectedList((previous: any) => {
      return {
        ...previous,
        QuestionAnswerDetails: [...QuestionAnswerDetails],
      };
    });
  }, [vehicleinspectiondata]);

  const setQuestionAnswerDetail = (value: any) => {
    setSelectedList(previous => {
      previous.QuestionAnswerDetails = previous?.QuestionAnswerDetails.map(
        (list: any) => {
          if (list.QuestionId === value.id) {
            list.Comment = value.comments;
            list.QuestionOptionAnswer = value.status;
          }
          return list;
        },
      );
      // console.log('setQuestionAnswerDetail selectedList: ', selectedList);
      return previous;
    });
  };

  const postInspectionQuestionAnswer = async () => {
    selectedList.Date = moment().format().toString();
    const isTrue = selectedList.QuestionAnswerDetails.every(
      x => x.QuestionOptionAnswer === 3,
    );
    if (!isTrue) {
      setIsloading(true);
      await dispatch(createInspection({ ...selectedList, Description: description }));
      setIsloading(false);
      navigation.goBack();
    } else {
      setIsloading(false);
      dispatch(
        showToast({
          type: 'error',
          text1: 'Error Message',
          text2: 'Please select at least one option',
        }),
      );
    }
  };

  return {
    setQuestionAnswerDetail,
    selectedList,
    vehicleinspectiondata,
    ref_input_field,
    onChangeKM,
    editableKm,
    handleSubmit,
    postInspectionQuestionAnswer,
    isLoading
  };
}
