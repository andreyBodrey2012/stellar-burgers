import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuid } from 'uuid';

type TConstructorItems = {
  bun: TConstructorIngredient | undefined | null;
  ingredients: TConstructorIngredient[];
};

export enum EMoveDirection {
  Up = -1,
  Down = 1
}

interface OrderState {
  items: TConstructorItems;
  error: null | string;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: OrderState = {
  items: {
    bun: null,
    ingredients: []
  },
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const fetchOrders = createAsyncThunk('order/fetchOrder', orderBurgerApi);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.items.bun = { id: action.payload._id, ...action.payload };
        return;
      }
      state.items.ingredients = [
        ...state.items.ingredients,
        { ...action.payload, id: uuid() }
      ];
    },
    removeItem(state, action: PayloadAction<Number>) {
      state.items.ingredients = state.items.ingredients.filter(
        (_, index) => index != action.payload
      );
    },
    resetOrderModalData(state) {
      state.orderModalData = null;
    },
    moveItem(
      state,
      action: PayloadAction<{ direction: EMoveDirection; index: number }>
    ) {
      const i = action.payload.index;
      if (action.payload.direction === EMoveDirection.Down) {
        // MoveDown
        const tmp = state.items.ingredients[i];
        state.items.ingredients[i] = state.items.ingredients[i + 1];
        state.items.ingredients[i + 1] = tmp;
      } else {
        // MoveUp
        const tmp = state.items.ingredients[i];
        state.items.ingredients[i] = state.items.ingredients[i - 1];
        state.items.ingredients[i - 1] = tmp;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orderRequest = false;
        if (action.payload.success) {
          state.items.bun = null;
          state.items.ingredients = [];
          state.orderModalData = action.payload.order;
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch orders.';
        state.orderRequest = false;
      });
  }
});

export const { addItem, removeItem, moveItem, resetOrderModalData } =
  orderSlice.actions;

export default orderSlice.reducer;
