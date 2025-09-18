/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */
import { expect, describe, it } from '@jest/globals';
import userReducer, {
  fetchLoginUser,
  fetchUser,
  IUserState
} from './userSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('проверка user стора', () => {
  const initialState: IUserState = {
    user: null,
    isLoading: false,
    isInit: false,
    error: null
  };

  it('проверка логина', async () => {
    const userLogin = {
      success: true,
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWRkZTk3NjczMDg2MDAxYmE4NGQ1ZCIsImlhdCI6MTc1ODIxMTMzMywiZXhwIjoxNzU4MjEyNTMzfQ.1nQtZZ5y_U5slSA5Fixthv3pKsLrpUBVpWZ6qvPMTEo',
      refreshToken:
        'df4eaf665195ba896ce74511e2185ce47d5bffddb651e71add166089b0378b916065eed94748663e',
      user: {
        email: 'andrejzapozdaev@gmail.com',
        name: 'Andrey'
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          new Promise((resolve) => setTimeout(() => resolve(userLogin), 0))
      })
    ) as jest.Mock;

    Object.defineProperty(document, 'cookie', {
      get: jest.fn().mockReturnValue({
        match: jest.fn().mockReturnValue([true, 'accessToken']),
        toString: () => 'accessToken=accessToken'
      }),
      configurable: true
    });

    const store = configureStore({
      reducer: { feedOrder: userReducer }
    });

    const dispatchPromise = store.dispatch(fetchUser());

    await dispatchPromise;

    const { user, isInit, isLoading, error } = store.getState().feedOrder;
    expect(error).toBeNull();
    expect(user).toEqual(userLogin.user);
  });

  it('проверка авторизации', async () => {
    const userRegister = {
      success: true,
      user: {
        email: 'andredefont@mail.ru',
        name: 'AndreDeFontaine'
      },
      accessToken:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Y2MyZTcxNjczMDg2MDAxYmE4OGMwNCIsImlhdCI6MTc1ODIxMTY5NywiZXhwIjoxNzU4MjEyODk3fQ.a3N0PRVxI9oEOV6ab-QLJhREwbtYd2clCe7XPkf2s_w',
      refreshToken:
        'a646b3d0c763b24dd792857f2a0689b0b77be16e9697eac9576838dd549db88ce8a649ce539cf467'
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          new Promise((resolve) => setTimeout(() => resolve(userRegister), 0))
      })
    ) as jest.Mock;

    Object.defineProperty(document, 'cookie', {
      get: jest.fn().mockReturnValue({
        match: jest.fn().mockReturnValue([true, 'accessToken']),
        toString: () => 'accessToken=accessToken'
      }),
      configurable: true
    });

    const store = configureStore({
      reducer: { feedOrder: userReducer }
    });

    const dispatchPromise = store.dispatch(fetchUser());

    await dispatchPromise;

    const { user, isInit, isLoading, error } = store.getState().feedOrder;
    expect(error).toBeNull();
    expect(user).toEqual(userRegister.user);
  });

  it('проверка выхода', async () => {
    const userLogout = { success: true, message: 'Successful logout' };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          new Promise((resolve) => setTimeout(() => resolve(userLogout), 0))
      })
    ) as jest.Mock;

    Object.defineProperty(document, 'cookie', {
      get: jest.fn().mockReturnValue({
        match: jest.fn().mockReturnValue([true, 'accessToken']),
        toString: () => 'accessToken=accessToken'
      }),
      configurable: true
    });

    const store = configureStore({
      reducer: { feedOrder: userReducer }
    });

    const dispatchPromise = store.dispatch(fetchUser());

    await dispatchPromise;

    const { error } = store.getState().feedOrder;
    expect(error).toBeNull();
  });
});
