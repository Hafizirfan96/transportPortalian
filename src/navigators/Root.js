/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import * as React from 'react';
import { CommonActions, DrawerActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigateBack() {
  if (navigationRef.current.isReady()) {
    navigationRef.current?.goBack();
  }
}
export function navigate(name, params) {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.navigate(name, params);
  }
}

export function navigateAndReset(routes = [], index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
}

export function navigateAndSimpleReset(name, index = 0) {
  if (navigationRef.current?.isReady()) {
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index,
        routes: [{ name }],
      }),
    );
  }
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
