import { createSlice } from "@reduxjs/toolkit"
import { CostTypesService } from '../services'

export const costTypesSlice = createSlice({
    name: "costTypes",
    initialState: {
        loading: false,
        hasErrors: false,
        costTypes: [],
    },
    reducers: {
        getCostTypes: state => {
            state.loading = true
        },
        getCostTypesSuccess: (state, { payload }) => {
            state.costTypes = payload
            state.loading = false
            state.hasErrors = false
        },
        getCostTypesFailure: state => {
            state.loading = false
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
        dispatch(getCostTypes())

        try {
            const response = CostTypesService.GetCostTypes();
            const data = response; //await response.json()

            dispatch(getCostTypesSuccess(data))
        } catch (error) {
            dispatch(getCostTypesFailure())
        }
    }
}