import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

import App from './App';

describe('App Unit Tests', () => {
  it('should render to the DOM', () => {
    const testStore = createStore(rootReducer);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={testStore}>
        <App />
      </Provider>
    )

    expect(getByText('Burrito Builder')).toBeInTheDocument();
    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByText('Order: Nothing selected')).toBeInTheDocument();
  })
})

describe('App Integration Tests', () => {
  it('should be able to fill out OrdeForm', () => {
    const testStore = createStore(rootReducer);
    const { getByText, getByPlaceholderText } = render(
      <Provider store={testStore}>
        <App />
      </Provider>
    )

    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'Michael Scarn' } })
    fireEvent.click(getByText('carnitas'))
    fireEvent.click(getByText('beans'))

    expect(getByText('Order: carnitas, beans')).toBeInTheDocument();

    fireEvent.click(getByText('Submit Order'));

    expect(getByText('Order: Nothing selected')).toBeInTheDocument();
  });
})
