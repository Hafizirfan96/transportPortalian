import { useAppDispatch, useAppSelector } from '@/hooks';
import { showToast } from '@/store/appState';
import { productSelector, resetProduct } from '@/store/product';
import { productLists } from '@/store/product/productInfo';
import { isTourValid, tourSelector } from '@/store/tour';
import { endTour, tourInfo } from '@/store/tour/tourInfo';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

export default function (tourId: any, projectId: any) {
  const dispatch = useAppDispatch();
  const defaultValues: any = {
    products: [],
    ref: '',
    km: '',
    distance: '',
  };
  const {
    control,
    handleSubmit,
    // errors,
    getValues,
    trigger,
    formState,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'products', // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const [selectedList, setSelectedList] = useState({
    TourId: tourId,
    Reference: '',
    Detail: [] as any[],
  });
  const [showtoast, setToast] = useState(false);

  const payload = {
    TourId: tourId,
    ProjectId: projectId,
  };
  const payloadList = {
    CurrentPage: '1',
    PageSize: '20',
    SortOrder: 'Asc',
    SearchTerm: '',
    SortBy: 'Asc',
  };

  const [reference, setReference] = useState({
    ref: '',
    km: '',
    distance: '',
  });
  const { productData: productListData } = useAppSelector(productSelector);
  const { isLoading, TourValid } = useAppSelector(tourSelector);
  const [tours, setTours] = useState(productListData);

  useEffect(() => {
    setTours(productListData);
  }, [productListData]);

  useEffect(() => {
    // if (productListData == null || productListData?.length == 0) {
    dispatch(productLists(payload));
    dispatch(tourInfo());
    // }
    return () => {
      dispatch(resetProduct());
    };
  }, []);

  useEffect(() => {
    const querydata = productListData;
    const Detail: any[] = [];
    // console.log('Detail in useEffect ', Detail);
    querydata?.forEach((ProjectGroup: any) => {
      ProjectGroup?.Products.forEach((list: any) => {
        if (list.Quantity >= 0) {
          Detail.push({
            Comments: '',
            ProductId: list.ProductId,
            Quantity: list.Quantity,
            Price: list.Price,
          });
        }
      });
    });
    setSelectedList((previous: any) => {
      return {
        ...previous,
        Detail: Detail,
      };
    });
    return () => {
      dispatch(isTourValid(false));
    };
  }, [productListData]);

  const setProductsDetail = (value: any) => {
    setSelectedList(previous => {
      previous.Detail = previous.Detail.map(list => {
        if (list.ProductId == value.id) {
          list.Comments = value.comment;
          list.Quantity = value.quantity;
        }

        return list;
      });
      return previous;
    });
  };

  const InputReference = (text: any) => {
    setReference(previous => {
      return {
        ...previous,
        ref: text,
      };
    });
  };
  // const onReferencedebounce = _.debounce(InputReference, 1000);
  const onReference = (text: any) => {
    InputReference(text);
  };

  const Inputkm = (text: any) => {
    setReference(previous => {
      return {
        ...previous,
        km: text,
      };
    });
  };
  // const onChangeKmdebounce = _.debounce(Inputkm, 1000);
  const onChangeKm = (text: any) => {
    Inputkm(text);
  };

  const InputDistanceSum = (text: any) => {
    setReference(previous => {
      return {
        ...previous,
        distance: text,
      };
    });
  };
  // const onSumDistancedebounce = _.debounce(InputDistanceSum, 1000);
  const onSumDistance = (text: any) => {
    InputDistanceSum(text);
  };
  const tourEnd = (modal: any, newFields: any) => {
    const extractedData = modal.flatMap(group => 
      group.Products.map(product => ({
        ProductId: product.ProductId,
        Price: product.data.price.value
          ? parseFloat(product.data.price.value)
          : 0,
        Quantity: product.data.quantity.value
          ? parseInt(product.data.quantity.value, 10)
          : 0,
        Comments: product.data.comment.value || '',
      })),
    );
    dispatch(
      endTour({
        TourId: tourId,
        Reference: reference.ref,
        Detail: [...extractedData, ...newFields],
      }),
    );
  };

  return {
    productListData,
    setProductsDetail,
    showtoast,
    isLoading,
    onReference,
    onChangeKm,
    onSumDistance,
    reference,
    tourEnd,
    control,
    handleSubmit,
    errors,
    getValues,
    trigger,
    formState,
    setValue,
    fields,
    remove,
    append,
    TourValid,
    tours,
    setTours
  };
}
