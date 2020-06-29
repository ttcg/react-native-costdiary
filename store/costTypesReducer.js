import { createSlice } from "@reduxjs/toolkit"
import data from '../data/costtypes.json';

export const costTypesSlice = createSlice({
    name: "costTypes",
    initialState: data,
    reducers: {
        
    }
})

export const {    
} = costTypesSlice.actions;

export const selectCostTypes = state => state.costTypes;

export default costTypesSlice.reducer;