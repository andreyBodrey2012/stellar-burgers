import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumberApi } from '@api';

interface AppState {
  ready: boolean;
  selectedIngredient: string | null;
  selectedFeedOrder: string | null;
  selectedOrder: TOrder | null;
  isLoadingOrder: boolean;
}

const initialState: AppState = {
  ready: false,
  selectedIngredient: null,
  selectedFeedOrder: null,
  selectedOrder: null,
  isLoadingOrder: false
};

export const fetchOrderByNumber = createAsyncThunk(
  'feed/fetchOrderByNumber',
  getOrderByNumberApi
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setReady(state) {
      state.ready = true;
    },
    setIngredient(state, action: PayloadAction<string | null>) {
      state.selectedIngredient = action.payload;
    },
    setFeedOrder(state, action: PayloadAction<string | null>) {
      state.selectedFeedOrder = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoadingOrder = true;
        state.selectedOrder = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoadingOrder = false;
        state.selectedOrder = action.payload.orders[0] || null;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.isLoadingOrder = false;
        state.selectedOrder = null;
      })
});

export const { setIngredient } = appSlice.actions;
export const { setFeedOrder } = appSlice.actions;

export default appSlice.reducer;
