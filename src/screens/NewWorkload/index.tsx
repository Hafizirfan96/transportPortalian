import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '@/hooks';
import getStyles from '@/screens/NewWorkload/styles';
import useNewWorkload from '@/hooks/useNewWorkload';
import NewWorkloadComponent from '@/components/NewWorkload';

const NewWorkload = () => {
  const { Layout, Colors, Common, FontSize, Gutters } = useTheme();
  const styles = getStyles(Colors, FontSize);

  const {
    isLoading,
    address,
    locations,
    setaddress,
    control,
    tour,
    setTour,
    projects,
    WORKLOAD_TYPE,
    errors,
    handleSubmit,
    onSaveClick,
    defaultFinishDate,
    defaultStartDate,
  } = useNewWorkload();

  return (
    <View style={[Layout.fill]}>
      <ScrollView style={[styles.authWrapper]}>
        <View style={[styles.whiteSpace]} />
        <NewWorkloadComponent
          address={address}
          setaddress={setaddress}
          control={control}
          isLoading={isLoading}
          locations={locations}
          tour={tour}
          setTour={setTour}
          projects={projects}
          WORKLOAD_TYPE={WORKLOAD_TYPE}
          defaultStartDate={defaultStartDate}
          defaultFinishDate={defaultFinishDate}
          errors={errors}
          handleSubmit={handleSubmit}
          onSaveClick={onSaveClick}
        />
      </ScrollView>
    </View>
  );
};
export default NewWorkload;
