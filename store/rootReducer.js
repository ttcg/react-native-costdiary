import { combineReducers } from 'redux'

import costTypesReducer from './costTypesReducer'
import costItemsReducer from './costItemsReducer'
import counterReducer from './counterReducer'
import toasterReducer from './toasterReducer'
import spinnerReducer from './spinnerReducer'

const rootReducer = combineReducers({
    costTypes: costTypesReducer,
    costItems: costItemsReducer,
    toaster: toasterReducer,
    spinner: spinnerReducer,
    counter: counterReducer
})

export default rootReducer