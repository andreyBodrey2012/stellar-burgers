import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import appReducer from './slices/appSlice';
import ingredientReducer from './slices/ingredientSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import feedReducers from './slices/feedSlice';
import userOrdersReducers from './slices/userOrdersSlice';

export const rootReducer = {
  app: appReducer,
  ingredients: ingredientReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducers,
  userOrders: userOrdersReducers
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
