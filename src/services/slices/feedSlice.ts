import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

interface FeedState {
  isLoading: boolean;
  items: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: FeedState = {
  isLoading: false,
  items: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', getFeedsApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.isLoading = false;
        state.items = orders;
        state.total = total;
        state.totalToday = totalToday;
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.items = [];
        state.total = 0;
        state.totalToday = 0;
        state.error = action.error.message || 'Failed to fetch feed';
      });
  },
  selectors: {
    selectItems: (state) => state.items,
    selectIsLoading: (state) => state.isLoading
  }
});

export const { selectItems, selectIsLoading } = feedSlice.selectors;

export default feedSlice.reducer;
