import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
	reducer: { filterSlice, pizza },
});
