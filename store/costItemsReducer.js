import { createSlice } from "@reduxjs/toolkit"
import data from '../data/costitems.json';

export const costItemsSlice = createSlice({
    name: "costItems",
    initialState: data,
    reducers: {
        
    }
})

export const {    
} = costItemsSlice.actions;

export const selectCostItems = state => state.costItems;

export default costItemsSlice.reducer;