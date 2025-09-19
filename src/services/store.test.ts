import { expect, describe, it } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('проверка rootReducer', () => {
  it('проверка должен возвращать корректное начальное состояние для неизвестного экшена', () => {
    const store = configureStore({ reducer: rootReducer, devTools: false });
    const initialState = store.getState();

    const result = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    store.dispatch({ type: 'UNKNOWN_ACTION' });

    expect(result).toEqual(initialState);
  });
});
