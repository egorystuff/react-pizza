import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async ({ params }) => {
	const { order, sortBy, category, search, currentPage } = params;
	const { data } = await axios.get(
		`https://64b69a6fdf0839c97e15d9be.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
	);
	return data;
});

const initialState = {
	items: [],
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.fulfilled]: (state, action) => {},
	},
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
