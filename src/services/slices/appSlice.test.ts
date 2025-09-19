import { expect, describe, it } from '@jest/globals';
import appSliceReducer, {
  AppState,
  setFeedOrder,
  setIngredient
} from './appSlice';

describe('проверка app стора', () => {
  const initialState: AppState = {
    ready: false,
    selectedIngredient: null,
    selectedFeedOrder: null,
    selectedOrder: null,
    isLoadingOrder: false
  };
  it('проверка поднятия модального окна у ингредиента', async () => {
    const newState = appSliceReducer(initialState, setIngredient('some_id'));
    const { selectedIngredient } = newState;

    expect(selectedIngredient).toEqual('some_id');
  });

  it('проверка поднятия модального окна у заказа', async () => {
    const newState = appSliceReducer(initialState, setFeedOrder('some_id'));
    const { selectedFeedOrder } = newState;

    expect(selectedFeedOrder).toEqual('some_id');
  });
});
