import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

export interface UserOrdersState {
  isLoading: boolean;
  items: TOrder[];
  error: string | null;
}

const initialState: UserOrdersState = {
  isLoading: false,
  items: [],
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  'userOrder/fetchUserOrders',
  getOrdersApi
);

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.error = action.error.message || 'Failed to fetch feed';
      });
  },
  selectors: {
    selectItems: (state) => state.items,
    selectIsLoading: (state) => state.isLoading
  }
});

export const { selectItems, selectIsLoading } = userOrdersSlice.selectors;

export default userOrdersSlice.reducer;
