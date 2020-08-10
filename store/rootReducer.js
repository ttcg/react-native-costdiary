import { combineReducers } from 'redux'

import costTypesReducer from './costTypesReducer'
import costItemsReducer from './costItemsReducer'
import counterReducer from './counterReducer'
import toasterReducer from './toasterReducer'
import spinnerReducer from './spinnerReducer'
import settingsReducer from './settingsReducer'

const rootReducer = combineReducers({
    costTypes: costTypesReducer,
    costItems: costItemsReducer,
    toaster: toasterReducer,
    spinner: spinnerReducer,
    settings: settingsReducer,
    counter: counterReducer
})

export default rootReducer