import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  registerUserApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export interface IUserState {
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
  async (data: TRegisterData, { dispatch }) => {
    const response = await registerUserApi(data);
    const { refreshToken, accessToken, user, success } = response;

    if (success) {
      dispatch(setTokens({ refreshToken, accessToken }));
    }

    return user;
  }
);
export const fetchLoginUser = createAsyncThunk(
  'user/LoginUser',
  async (credentials: TLoginData, { dispatch }) => {
    const response = await loginUserApi(credentials);
    const { refreshToken, accessToken, user, success } = response;

    if (success) {
      dispatch(setTokens({ refreshToken, accessToken }));
    }

    return user;
  }
);

export const fetchLogoutUser = createAsyncThunk(
  'user/LogoutUser',
  async (_, { dispatch }) => {
    const response = await logoutApi();

    if (response.success) {
      dispatch(clearTokens());
    }

    return response;
  }
);

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
    },
    setTokens(_, action) {
      const { refreshToken, accessToken } = action.payload;
      localStorage.setItem('refreshToken', refreshToken);
      setCookie('accessToken', accessToken);
    },
    clearTokens() {
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    },
    setUser(state, action) {
      state.user = action.payload;
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
        state.user = action.payload;
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
        state.isInit = true;
        state.isLoading = false;
        state.error = null;
        state.user = action.payload.user;
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
        state.user = action.payload;
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

export const { init, setTokens, setUser, clearTokens } = userSlice.actions;

export default userSlice.reducer;
