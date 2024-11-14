import React from 'react';
import Header from '@/components/Header';
import CustomSafeArea from '@/components/Shared/CustomSafeArea';
import RegisterNewDamageComponent from '@/components/RegisterNewDamage/RegisterDamage';

const RegisterNewDamage = () => {

  return (
    <CustomSafeArea>
      <Header title="Register New Damage" backPage="VehicleInspection" />

      <RegisterNewDamageComponent />
    </CustomSafeArea>
  );
};
export default RegisterNewDamage;
