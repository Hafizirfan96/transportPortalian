import React from 'react';
import { ScrollView, View } from 'react-native';
import { Reference } from '@/components';
import { useTheme } from '@/hooks';
import ToastMessage from '@/components/Toast';
import getStyles from './style';
import useEndTour from '@/hooks/useEndTour';
import EndTourInfo from '@/components/EndTour/EndTourInfo';

const EndTourScreen = ({ route }: { route: any }) => {
  const { Colors, FontSize } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const tourId = route.params.TourId;
  const projectId = route.params.ProjectId;

  const {
    productListData,
    showtoast,
    isLoading,
    reference,
    onReference,
    onChangeKm,
    onSumDistance,
    setProductsDetail,
    tourEnd,
    control,
    handleSubmit,
    errors,
    getValues,
    trigger,
    formState,
    setValue,
    fields,
    append,
    remove,
    TourValid,
    tours,
    setTours
  } = useEndTour(tourId, projectId);

  return (
    <ScrollView contentContainerStyle={[styles.container]}>
      <Reference
        errors={errors}
        control={control}
        onReference={onReference}
        onChangeKm={onChangeKm}
        onSumDistance={onSumDistance}
        reference={reference}
      />
      <EndTourInfo
        control={control}
        productListData={productListData}
        setProductsDetail={setProductsDetail}
        isLoading={isLoading}
        tourEnd={tourEnd}
        showtoast={showtoast}
        reference={reference}
        handleSubmit={handleSubmit}
        getValue={getValues}
        errors={errors}
        fields={fields}
        remove={remove}
        append={append}
        TourValid={TourValid}
        tours={tours}
        setTours={setTours}
      />
    </ScrollView>
  );
};

export default EndTourScreen;
