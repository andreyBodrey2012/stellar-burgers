import { expect, describe, it } from '@jest/globals';
import orderReducer, {
  addItem,
  EMoveDirection,
  fetchOrders,
  moveItem,
  OrderState,
  removeItem
} from './orderSlice';

describe('проверка конструктора', () => {
  const initialState: OrderState = {
    items: {
      bun: null,
      ingredients: []
    },
    error: null,
    orderRequest: false,
    orderModalData: null
  };

  const items = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0944',
      name: 'Соус традиционный галактический',
      type: 'sauce',
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0947',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
      __v: 0
    }
  ];

  it('проверка добавления ингридиента', () => {
    let newState = orderReducer(initialState, addItem(items[0]));

    expect(newState.items.bun?.id).toEqual(items[0]._id);
    expect(newState.items.ingredients.length).toEqual(0);

    newState = orderReducer(newState, addItem(items[1]));

    expect(newState.items.bun?.id).toEqual(items[0]._id);
    expect(newState.items.ingredients.length).toEqual(1);
  });

  it('проверка удаления ингредиента', () => {
    let newState = orderReducer(initialState, addItem(items[1]));

    expect(newState.items.ingredients).toEqual(
      expect.arrayContaining([expect.objectContaining({ _id: items[1]._id })])
    );
    expect(newState.items.ingredients.length).toEqual(1);

    newState = orderReducer(newState, removeItem(0));
    expect(newState.items.ingredients.length).toEqual(0);
  });

  it('проверка перемещения ингредиентов', () => {
    let newState = orderReducer(initialState, addItem(items[1]));
    newState = orderReducer(newState, addItem(items[2]));

    expect(
      newState.items.ingredients.findIndex((item) => item._id === items[2]._id)
    ).toEqual(1);
    newState = orderReducer(
      newState,
      moveItem({ direction: EMoveDirection.Up, index: 1 })
    );
    expect(
      newState.items.ingredients.findIndex((item) => item._id === items[2]._id)
    ).toEqual(0);
    newState = orderReducer(
      newState,
      moveItem({ direction: EMoveDirection.Down, index: 0 })
    );
    expect(
      newState.items.ingredients.findIndex((item) => item._id === items[2]._id)
    ).toEqual(1);
  });

  it('проверка pending', () => {
    const newState = orderReducer(initialState, fetchOrders.pending('', []));

    expect(newState).toEqual({
      ...initialState,
      orderRequest: true
    });
  });

  it('проверка fulfilled', () => {
    const initialState1 = {
      ...initialState,
      items: {
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          }
        ]
      }
    };
    const orderResult = {
      success: true,
      order: {
        _id: '',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 10,
        ingredients: []
      },
      name: ''
    }

    const newState = orderReducer(
      initialState1,
      fetchOrders.fulfilled(
        orderResult,
        '',
        []
      )
    );

    expect(newState).toEqual({
      ...initialState1,
      items: initialState.items,
      orderModalData: orderResult.order
    });
  });

  it('проверка rejected', () => {
    const newState = orderReducer(initialState, fetchOrders.rejected(new Error('Error rejected'), '', []));

    expect(newState).toEqual({
      ...initialState,
      error: 'Error rejected'
    });
  });
});
