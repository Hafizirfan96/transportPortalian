import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { default as useTheme } from './useTheme';
export { default as useDashboardInfo } from './useDashboardInfo';
export { default as useTourInfo } from './useTourInfo';
export { default as useVehicleInfo } from './useVehicleInfo';
export { default as useEndTour } from './useEndTour';
export { default as useVehicleDetail } from './useVehicleDetail';
export { default as useVehicleService } from './useVehicleService';
export { default as useVehicleInspection } from './useVehicleInspection';
export { default as useRegisterDamage } from './useRegisterDamage';
export { default as useLogin } from './useLogin';
export { default as useWorkload } from './useWorkload';
export { default as useNewWorkload } from './useNewWorkload';
export { default as useShipment } from './useShipment';
