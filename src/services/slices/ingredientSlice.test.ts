import { expect, describe, it } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
  IngredientState,
  setLoading,
  fetchIngredients
} from './ingredientSlice';

describe('тест ингредиентов', () => {
  const initialState: IngredientState = {
    isLoading: false,
    items: [],
    error: null
  };

  it('проверка состояния флага загрузки', () => {
    const newState = ingredientsReducer(initialState, setLoading(true));
    const { isLoading } = newState;

    expect(isLoading).toBeTruthy();
  });

  it('тест загрузки ингридиентов', async () => {
    const expectResult = {
      success: true,
      data: [
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
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
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        }
      ]
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          new Promise((resolve) => setTimeout(() => resolve(expectResult), 0))
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });

    const dispatchPromise = store.dispatch(fetchIngredients());

    const stateDuringLoading = store.getState().ingredients;
    expect(stateDuringLoading.isLoading).toBeTruthy();

    await dispatchPromise;

    const { items, error, isLoading } = store.getState().ingredients;
    expect(error).toBeNull();
    expect(isLoading).toBeFalsy();
    expect(items).toEqual(expectResult.data);
  });

  it('тест загрузки ингридиентов с ошибкой', async () => {
    const expectResult = {
      message: 'not found'
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          new Promise((resolve) => setTimeout(() => resolve(expectResult), 0))
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer: { ingredients: ingredientsReducer }
    });

    const dispatchPromise = store.dispatch(fetchIngredients());

    const stateDuringLoading = store.getState().ingredients;
    expect(stateDuringLoading.isLoading).toBeTruthy();

    await dispatchPromise;

    const { items, error, isLoading } = store.getState().ingredients;
    expect(error).toEqual('not found');
    expect(isLoading).toBeFalsy();
    expect(items).toEqual([]);
  });
});
