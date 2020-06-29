import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import costTypesReducer from './costTypesReducer'
import costItemsReducer from './costItemsReducer'
import counterReducer from './counterReducer'

const store = configureStore({
    reducer: {
    costTypes: costTypesReducer,
    costItems: costItemsReducer,
    counter: counterReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;