import { createSlice } from "@reduxjs/toolkit"
import { CostItemsService, CostItemsServiceApi } from '../services'
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
        addCostItemSuccess: state => {
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
        deleteCostItemSuccess: state => {
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
        costItemOperationSuccess: state => {
            state.hasSubmitted = true
            state.submitting = false
            state.hasErrors = false
        },
        costItemOperationFailure: state => {
            state.submitting = false
            state.hasErrors = true
        }
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
    editCostItemFailure,
    costItemOperationSuccess,
    costItemOperationFailure
} = costItemsSlice.actions;

export const selectCostItems = state => state.costItems;

export default costItemsSlice.reducer;

export const fetchCostItems = () => {
    return async dispatch => {
        dispatch(beginAjaxCall())
        dispatch(getCostItems())

        try {
            const response = CostItemsService.GetCostItems();
            const data = response;
            setTimeout(function () {
                dispatch(getCostItemsSuccess(data))
            }, 1);
        } catch (error) {
            dispatch(getCostItemsFailure())
        }
    }
}

export const fetchCostItemsWithFilter = (year, month) => {
    return async dispatch => {
        dispatch(beginAjaxCall())

        try {
            const payload = {
                params: { year, month }
            }
            const response = await CostItemsServiceApi.Filter(payload);
            const data = response.data;
            dispatch(getCostItemsSuccess(data))
        } catch (error) {
            console.error(error)
            dispatch(getCostItemsFailure())
        }
    }
}

export const triggerAddCostItem = (payload) => {
    return async (dispatch, getState) => {
        dispatch(beginAjaxCall())
        dispatch(addCostItem())

        try {
            await CostItemsServiceApi.Add(payload);

            FetchItemsWithDateFromState(dispatch, getState);
            dispatch(addCostItemSuccess());
            dispatch(showToast('Item has been added successfully'))

        } catch (error) {
            console.error(error)
            dispatch(addCostItemFailure())
        }
    }
}

export const triggerDeleteCostItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(beginAjaxCall())

        try {
            await CostItemsServiceApi.Delete(id);

            FetchItemsWithDateFromState(dispatch, getState);
            dispatch(deleteCostItemSuccess());
            dispatch(showToast('Item has been deleted successfully'))

        } catch (error) {
            console.error(error)
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

export const triggerResetCostItemsData = () => {
    return async (dispatch, getState) => {
        dispatch(beginAjaxCall())

        try {
            await CostItemsServiceApi.Reset();

            FetchItemsWithDateFromState(dispatch, getState);
            dispatch(costItemOperationSuccess());
            dispatch(showToast('Cost Items data is reset successfully'))

        } catch (error) {
            console.error(error)
            dispatch(costItemOperationFailure())
        }
    }
}

const FetchItemsWithDateFromState = (dispatch, getState) => {
    const { settings } = getState();
    dispatch(fetchCostItemsWithFilter(settings.selectedYear, settings.selectedMonth + 1));
}