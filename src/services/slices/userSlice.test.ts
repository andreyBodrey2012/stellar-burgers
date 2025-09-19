import { expect, describe, it } from '@jest/globals';
import userReducer, {
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
  IUserState
} from './userSlice';

describe('проверка user стора', () => {
  const initialState: IUserState = {
    user: null,
    isLoading: false,
    isInit: false,
    error: null
  };

  it('проверка pending login', () => {
    const newState = userReducer(
      initialState,
      fetchLoginUser.pending('', { email: '', password: '' })
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('проверка fulfilled login', () => {
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

    const newState = userReducer(
      initialState,
      fetchLoginUser.fulfilled(userLogin.user, '', { email: '', password: '' })
    );

    expect(newState).toEqual({
      ...initialState,
      user: userLogin.user
    });
  });

  it('проверка rejected login', () => {
    const newState = userReducer(
      initialState,
      fetchLoginUser.rejected(new Error('Error rejected login user'), '', { email: '', password: '' })
    );

    expect(newState).toEqual({
      ...initialState,
      error: 'Error rejected login user'
    });
  });

  it('проверка pending register', () => {
    const newState = userReducer(
      initialState,
      fetchRegisterUser.pending('', { email: '', password: '', name: '' })
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('проверка fulfilled register', () => {
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

    const newState = userReducer(
      initialState,
      fetchRegisterUser.fulfilled(userRegister.user, '', { email: '', password: '', name: '' })
    );

    expect(newState).toEqual({
      ...initialState,
      user: userRegister.user
    });
  });

  it('проверка rejected register', () => {
    const newState = userReducer(
      initialState,
      fetchRegisterUser.rejected(new Error('Error rejected register user'), '', { email: '', password: '', name: '' })
    );

    expect(newState).toEqual({
      ...initialState,
      error: 'Error rejected register user'
    });
  });

  it('проверка pending logout', () => {
    const newState = userReducer(
      initialState,
      fetchLoginUser.pending('', { email: '', password: '' })
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('проверка fulfilled logout', () => {
    const userLogout = { success: true, message: 'Successful logout' };

    const newState = userReducer(
      initialState,
      fetchLogoutUser.fulfilled(userLogout, '')
    );

    expect(newState).toEqual({
      ...initialState,
      user: null
    });
  });

  it('проверка rejected logout', () => {
    const newState = userReducer(
      initialState,
      fetchLogoutUser.rejected(new Error('Error rejected logout user'), '')
    );

    expect(newState).toEqual({
      ...initialState,
      error: 'Error rejected logout user'
    });
  });
});
