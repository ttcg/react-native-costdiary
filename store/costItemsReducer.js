import { createSlice } from "@reduxjs/toolkit"
import { costItemsService } from '../services'
import { showToast } from './toasterReducer'
import { beginAjaxCall } from './spinnerReducer'

export const costItemsSlice = createSlice({
    name: "costItems",
    initialState: {
        hasAdded: false,
        hasUpdated: false,
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
        resetCostItemMaintenance: state => {
            state.hasAdded = false
            state.hasUpdated = false
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
        editCostItem: state => {
            state.submitting = true
            state.hasUpdated = false
        },
        editCostItemSuccess: (state, { payload }) => {
            var index = state.costItems.findIndex(p => p.costItemId == payload.costItemId)
            state.costItems[index] = payload
            state.submitting = false
            state.hasErrors = false
            state.hasUpdated = true
        },        
        editCostItemFailure: state => {
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
    resetCostItemMaintenance,
    deleteCostItem,
    deleteCostItemSuccess,
    deleteCostItemFailure,
    editCostItem,
    editCostItemSuccess,
    editCostItemFailure
} = costItemsSlice.actions;

export const selectCostItems = state => state.costItems;

export default costItemsSlice.reducer;

export const fetchCostItems = () => {
    return async dispatch => {
        dispatch(beginAjaxCall())
        dispatch(getCostItems())

        try {
            const response = costItemsService.GetCostItems();
            const data = response; //await response.json()
            setTimeout(function () {
                dispatch(getCostItemsSuccess(data))
            }, 1000);
        } catch (error) {
            dispatch(getCostItemsFailure())
        }
    }
}

export const triggerAddCostItem = (payload) => {
    return async dispatch => {
        dispatch(beginAjaxCall())
        dispatch(addCostItem())

        try {
            setTimeout(function () {
                dispatch(addCostItemSuccess(payload))
                dispatch(showToast('A new item has been added successfully'))
            }, 1000);
            
            
        } catch (error) {
            dispatch(addCostItemFailure())
        }
    }
}

export const triggerDeleteCostItem = (payload) => {
    return async dispatch => {
        dispatch(beginAjaxCall())
        dispatch(deleteCostItem())

        try {
            setTimeout(function () {
                dispatch(deleteCostItemSuccess(payload))
                dispatch(showToast('Item has been deleted successfully'))
            }, 1000);
            
            
        } catch (error) {
            dispatch(deleteCostItemFailure())
        }
    }
}

export const triggerEditCostItem = (payload) => {
    return async dispatch => {
        dispatch(beginAjaxCall())
        dispatch(editCostItem())

        try {
            dispatch(editCostItemSuccess(payload))
            dispatch(showToast('Item has been edited successfully'))
        } catch (error) {
            dispatch(editCostItemFailure())
        }
    }
}