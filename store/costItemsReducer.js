import { createSlice } from "@reduxjs/toolkit"
import moment from "moment"
import { CostItemsServiceApi } from '../services'
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
        },
        getCostItemsFailure: state => {
            state.loading = false
            state.hasErrors = true
        },        
        resetCostItemMaintenance: state => {
            state.hasSubmitted = false
            state.hasErrors = false
            state.submitting = false
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
    resetCostItemMaintenance,
    costItemOperationSuccess,
    costItemOperationFailure
} = costItemsSlice.actions;

export const selectCostItems = state => state.costItems;

export default costItemsSlice.reducer;

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

        try {
            await CostItemsServiceApi.Add(payload);

            FetchItemsWithDateFromState(dispatch, getState);
            dispatch(costItemOperationSuccess());
            dispatch(showToast('Item has been added successfully'))

        } catch (error) {
            console.error(error)
            dispatch(costItemOperationFailure())
        }
    }
}

export const triggerDeleteCostItem = (id) => {
    return async (dispatch, getState) => {
        dispatch(beginAjaxCall())

        try {
            await CostItemsServiceApi.Delete(id);

            FetchItemsWithDateFromState(dispatch, getState);
            dispatch(costItemOperationSuccess());
            dispatch(showToast('Item has been deleted successfully'))

        } catch (error) {
            console.error(error)
            dispatch(costItemOperationFailure())
        }
    }
}

export const triggerEditCostItem = (id, payload) => {
    return async (dispatch, getState) => {
        dispatch(beginAjaxCall())

        try {
            await CostItemsServiceApi.Patch(id, payload);

            FetchItemsWithDateFromState(dispatch, getState);
            dispatch(costItemOperationSuccess());
            dispatch(showToast('Item has been edited successfully'))

        } catch (error) {
            console.error(error)
            dispatch(costItemOperationFailure())
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
    const selectedDate = moment(settings.currentDate)
    dispatch(fetchCostItemsWithFilter(selectedDate.year(), selectedDate.month() + 1));
}