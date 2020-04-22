import { orders } from './orders';

describe('Orders Reducers Tests', () => {
  it('should return the initial state', () => {
    const expected = [];

    const result = orders(undefined, {});
    expect(result).toEqual(expected)
  });

  it('should return state with fetched orders', () => {
    const expected = [
      {
        id: 1,
        name: 'Pat',
        ingredients: ['jalapenos', 'sour cream', 'sofritas']
      }
    ];
    const action = {
      type: 'SET_ORDERS',
      orders: expected
    }
    const result = orders([], action);
    expect(result).toEqual(expected)
  })
})
