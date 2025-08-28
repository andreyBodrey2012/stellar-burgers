import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  registerUserApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

interface IUserState {
  user: TUser | null;
  isLoading: boolean;
  isInit: boolean;
  error: string | null;
}

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isInit: false,
  error: null
};

export const fetchRegisterUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const fetchLoginUser = createAsyncThunk('user/LoginUser', loginUserApi);

export const fetchLogoutUser = createAsyncThunk('user/LogoutUser', logoutApi);

export const fetchUptatedUser = createAsyncThunk(
  'user/updateUserApi',
  updateUserApi
);

export const fetchUser = createAsyncThunk('user/getUser', getUserApi);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init(state) {
      state.isInit = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { refreshToken, accessToken, user } = action.payload;
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('accessToken', accessToken);
        state.user = user;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch register User';
      })
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.isInit = true;
        state.isLoading = false;
        state.error = null;
        state.user = user;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isInit = true;
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch register User';
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { refreshToken, accessToken, user } = action.payload;
        localStorage.setItem('refreshToken', refreshToken);
        setCookie('accessToken', accessToken);
        state.user = user;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch login User';
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchLogoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        state.error = null;
        state.user = null;
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch logout User';
      })
      .addCase(fetchUptatedUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUptatedUser.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUptatedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch updated User';
      });
  }
});

export const { init } = userSlice.actions;

export default userSlice.reducer;
