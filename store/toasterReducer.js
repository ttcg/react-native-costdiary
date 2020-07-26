import { createSlice } from "@reduxjs/toolkit"

export const toasterSlice = createSlice({
    name: "toaster",
    initialState: {
        message: null
    },
    reducers: {
        showToast: (state, { payload }) => { state.message = payload },
        hideToast: state => { state.message = null }
    }
})

export const {
    showToast,
    hideToast
} = toasterSlice.actions;

export const selectToaster = state => state.toaster;

export default toasterSlice.reducer;