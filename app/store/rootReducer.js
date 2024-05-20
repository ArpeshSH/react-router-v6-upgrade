import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import { apiSlice } from '../api/apiSlice';

const rootReducer = combineReducers({
  app: appReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
  // Add other slice reducers as needed
});

export default rootReducer;
