import { createSlice } from "@reduxjs/toolkit"

export const spinnerSlice = createSlice({
    name: "spinner",
    initialState: {
        numberOfAjaxCall: 0
    },
    reducers: {
        beginAjaxCall: state => { 
            state.numberOfAjaxCall = state.numberOfAjaxCall + 1 
        }
    },
    extraReducers: builder => {
        builder            
            .addMatcher(
                action => action.type.toUpperCase().endsWith('SUCCESS') || action.type.toUpperCase().endsWith('FAILURE'),
                (state, action) => { 
                    console.log(action.type);
                    state.numberOfAjaxCall = state.numberOfAjaxCall - 1 < 0 ? 0 : state.numberOfAjaxCall - 1;
                }
            )
    }
})

export const {
    beginAjaxCall
} = spinnerSlice.actions;

export const selectSpinner = state => state.spinner;

export default spinnerSlice.reducer;