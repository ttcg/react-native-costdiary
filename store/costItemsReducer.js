import { createSlice } from "@reduxjs/toolkit"
import { costItemsService } from '../services'

export const costItemsSlice = createSlice({
    name: "costItems",
    initialState: {
        hasAdded: false,
        hasSubmitted: false,
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
            state.hasAdded = false
        },
        getCostItemsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },
        addCostItem: state => {
            state.submitting = true
            state.hasAdded = false
        },
        addCostItemSuccess: (state, { payload }) => {
            state.costItems = state.costItems.concat(payload)
            state.submitting = false
            state.hasErrors = false
            state.hasAdded = true
        },        
        addCostItemFailure: state => {
            state.submitting = false
            state.hasErrors = true
        },
        resetCostItemAdd: state => {
            state.hasAdded = false
            state.hasSubmitted = false
            state.hasErrors = false
            state.submitting = false
        },
        deleteCostItem: state => {
            state.submitting = true
        },
        deleteCostItemSuccess: (state, { payload }) => {
            state.costItems = state.costItems.filter(item => item.costItemId !== payload)
            state.hasSubmitted = true
            state.submitting = false
            state.hasErrors = false
        },
        deleteCostItemFailure: state => {
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
    addCostItemFailure,
    resetCostItemAdd,
    deleteCostItem,
    deleteCostItemSuccess,
    deleteCostItemFailure
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
            dispatch(deleteCostItemSuccess(payload))
        } catch (error) {
            dispatch(addCostItemFailure())
        }
    }
}

export const triggerDeleteCostItem = (payload) => {
    return async dispatch => {
        dispatch(deleteCostItem())

        try {
            dispatch(deleteCostItemSuccess(payload))
        } catch (error) {
            dispatch(deleteCostItemFailure())
        }
    }
}