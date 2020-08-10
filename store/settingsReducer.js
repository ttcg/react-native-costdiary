import { createSlice } from "@reduxjs/toolkit"
import moment from "moment";

import { fetchCostItems } from './costItemsReducer'

export const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        currentDate: +moment()
    },
    reducers: {
        setCurrentDate: (state, { payload }) => {
            state.currentDate = payload
        }
    }
})

const {
    setCurrentDate
} = settingsSlice.actions;

export const selectSettings = state => state.settings;

export default settingsSlice.reducer;

export const triggerSetCurrentDate = (payload) => {
    return async dispatch => {        
        dispatch(setCurrentDate(payload))
        dispatch(fetchCostItems())
    }
}