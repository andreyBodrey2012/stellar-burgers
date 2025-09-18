import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface IngredientState {
  isLoading: boolean;
  items: TIngredient[];
  error: string | null;
}

const initialState: IngredientState = {
  isLoading: false,
  items: [],
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredient/fetchIngredients',
  getIngredientsApi
);

const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
      });
  },
  selectors: {
    selectItems: (state) => state.items,
    selectIsLoading: (state) => state.isLoading
  }
});

export const { selectItems, selectIsLoading } = ingredientSlice.selectors;

export const { setLoading } = ingredientSlice.actions;

export default ingredientSlice.reducer;
