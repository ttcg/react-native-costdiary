import { createSlice } from "@reduxjs/toolkit"
import { CostTypesService, CostTypesServiceApi } from '../services'
import { beginAjaxCall } from './spinnerReducer'

export const costTypesSlice = createSlice({
    name: "costTypes",
    initialState: {
        hasErrors: false,
        costTypes: [],
    },
    reducers: {
        getCostTypesSuccess: (state, { payload }) => {
            state.costTypes = payload
            state.hasErrors = false
        },
        getCostTypesFailure: state => {
            state.hasErrors = true
        }
    }
})

export const {
    getCostTypes,
    getCostTypesSuccess,
    getCostTypesFailure
} = costTypesSlice.actions;

export const selectCostTypes = state => state.costTypes;

export default costTypesSlice.reducer;

export const fetchCostTypes = () => {
    return async dispatch => {
        dispatch(beginAjaxCall())

        try {
            //const response = CostTypesService.GetCostTypes();
            //const data = response;

            const response = await CostTypesServiceApi.GetAll();
            const data = response.data

            dispatch(getCostTypesSuccess(data))
        } catch (error) {
            dispatch(getCostTypesFailure())
        }
    }
}