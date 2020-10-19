import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

import { fetchCostItemsWithFilter } from './costItemsReducer'

const currentDate = moment();
const initState = {
    currentDate: +currentDate
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initState,
    reducers: {
        setCurrentDate: (state, { payload }) => {
            state.currentDate = payload;
        }
    }
})

const {
    setCurrentDate
} = settingsSlice.actions;

export const selectSettings = state => state.settings;

export default settingsSlice.reducer;

export const triggerSetCurrentDate = (unixDate) => {
    return async dispatch => {    
        const selectedDate = moment(unixDate)
        dispatch(setCurrentDate(unixDate))        
        dispatch(fetchCostItemsWithFilter(selectedDate.year(), selectedDate.month() + 1))
    }
}