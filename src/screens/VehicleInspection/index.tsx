import React from 'react';
import { useTheme } from '@/hooks';
import ToastMessage from '@/components/Toast';
import useVehicleInspection from '@/hooks/useVehicleInspection';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { Header, Inspection, Damagecontrol, Button } from '@/components';
import VehicleInspectionInfo from '@/components/VehicleInspection/VehicleInspectionInfo';

const VehicleInspection = ({ route }: { route: any }) => {
  const { Gutters, Layout } = useTheme();
  const VehicleId = route.params.VehicleId;
  const {
    setQuestionAnswerDetail,
    selectedList,
    vehicleinspectiondata,
    ref_input_field,
    onChangeKM,
    editableKm,
    handleSubmit,
    postInspectionQuestionAnswer,
    isLoading,
  } = useVehicleInspection(VehicleId);

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Inspection
        item={item}
        setQuestionAnswerDetail={setQuestionAnswerDetail}
        name="testResult"
        rules={{
          maxLength: 3,
          required: true,
        }}
        questionList={selectedList.QuestionAnswerDetails}
      />
    );
  };

  return (
    <KeyboardAvoidingView style={[Layout.fill]}>
      <ToastMessage />
      <Header title="Vehicle Inspection" backPage="VehicleDetail" />

      <Damagecontrol />

      <ScrollView contentContainerStyle={[Layout.flexGrow]}>
        <View style={[Gutters.mediumHPadding, Gutters.smallBMargin]}>
          <ScrollView>
            <VehicleInspectionInfo
              ref_input_field={ref_input_field}
              selectedList={selectedList}
              onChangeKM={onChangeKM}
              editableKm={editableKm}
              vehicleinspectiondata={vehicleinspectiondata}
              renderItem={renderItem}
            />
            <View style={[Gutters.regularTMargin]}>
              <Button
                title="Submit"
                isLoading={isLoading}
                handleSubmit={handleSubmit(postInspectionQuestionAnswer)}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VehicleInspection;
