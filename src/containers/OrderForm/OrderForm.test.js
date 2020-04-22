import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

import OrderForm from './OrderForm';

describe('OrderForm Tests', () => {
  it('shoud render to the DOM', () => {
    const testStore = createStore(rootReducer);
    const { getByPlaceholderText, getByText } = render(
      <Provider store={testStore}>
        <OrderForm />
      </Provider>
    );

    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByText('beans')).toBeInTheDocument();
    expect(getByText('cilantro')).toBeInTheDocument();
    expect(getByText('sour cream')).toBeInTheDocument();
  });

  it('should be able to be updated and submited', async () => {
    const testStore = createStore(rootReducer);
    const { getByPlaceholderText, getByText } = render(
      <Provider store={testStore}>
        <OrderForm />
      </Provider>
    );

    const nameInput = getByPlaceholderText('Name');
    const sofritasButton = getByText('sofritas');
    const jalapenosButton = getByText('jalapenos');
    const submitButton = getByText('Submit Order');

    fireEvent.change(nameInput, { target: { value: 'Jefff' } });
    fireEvent.click(sofritasButton)
    fireEvent.click(jalapenosButton)

    expect(getByText('Order: sofritas, jalapenos')).toBeInTheDocument();

    fireEvent.click(submitButton);

    expect(getByText('Order: Nothing selected')).toBeInTheDocument();
  })
})
