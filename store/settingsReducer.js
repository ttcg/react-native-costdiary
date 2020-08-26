import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

import { fetchCostItemsWithFilter } from './costItemsReducer'

const currentDate = moment();
const initState = {
    currentDate: +currentDate,
    selectedYear: currentDate.year(),
    selectedMonth: currentDate.month()
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState: initState,
    reducers: {
        setCurrentDate: (state, { payload }) => {
            state = payload
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
        const payload = {
            currentDate: unixDate,
            year: selectedDate.year(),
            month: selectedDate.month()
        }
        dispatch(setCurrentDate(payload))        
        dispatch(fetchCostItemsWithFilter(selectedDate.year(), selectedDate.month() + 1))
    }
}