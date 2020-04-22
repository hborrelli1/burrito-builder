import * as actions from '.';

describe('Actions Test', () => {
  it('should have a type of SET_ORDERS', () => {
    const orders = [
      {
        id: 1,
        name: 'Pat',
        ingredients: ['jalapenos', 'sour cream', 'sofritas']
      }
    ]
    const expectedAction = {
      type:'SET_ORDERS',
      orders
    }
    const result = actions.setOrders(orders);
    expect(result).toEqual(expectedAction);
  })
})
