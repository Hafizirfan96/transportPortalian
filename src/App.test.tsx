import 'react-native';
import App from './App';
import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';

it('App renders correctly', () => {
  const component = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(component);

  expect(component).toBeDefined();
});
