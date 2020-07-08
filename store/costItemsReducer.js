import { createSlice } from "@reduxjs/toolkit"
import { costItemsService } from '../services'

export const costItemsSlice = createSlice({
    name: "costItems",
    initialState: {
        loading: false,
        submitting: false,
        hasErrors: false,
        costItems: [],
    },
    reducers: {
        getCostItems: state => {
            state.loading = true
        },
        getCostItemsSuccess: (state, { payload }) => {
            state.costItems = payload
            state.loading = false
            state.hasErrors = false
        },
        getCostItemsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        addCostItem: state => {
            state.submitting = true
        },
        addCostItemSuccess: (state, { payload }) => {
            state.costItems = state.costItems.concat(payload)
            state.submitting = false,
            state.hasErrors = false
        },
        addCostItemFailure: state => {
            state.submitting = false
            state.hasErrors = true
        },
    }
})

export const {
    getCostItems,
    getCostItemsSuccess,
    getCostItemsFailure,
    addCostItem,
    addCostItemSuccess,
    addCostItemFailure
} = costItemsSlice.actions;

export const selectCostItems = state => state.costItems;

export default costItemsSlice.reducer;

export const fetchCostItems = () => {
    return async dispatch => {
        dispatch(getCostItems())

        try {
            const response = costItemsService.GetCostItems();
            const data = response; //await response.json()

            dispatch(getCostItemsSuccess(data))
        } catch (error) {
            dispatch(getCostItemsFailure())
        }
    }
}

export const addCostItemBegin = (payload) => {
    return async dispatch => {
        dispatch(addCostItem())

        try {    
            dispatch(addCostItemSuccess(payload))
        } catch (error) {
            dispatch(addCostItemFailure())
        }
    }
}