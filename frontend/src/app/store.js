// this is the redux store file. It is where we will be creating the store and adding the reducers to it.
// the store is used to store the state of the entire application.

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

