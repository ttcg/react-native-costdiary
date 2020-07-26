import { combineReducers } from 'redux'

import costTypesReducer from './costTypesReducer'
import costItemsReducer from './costItemsReducer'
import counterReducer from './counterReducer'
import toasterReducer from './toasterReducer'

const rootReducer = combineReducers({
    costTypes: costTypesReducer,
    costItems: costItemsReducer,
    toaster: toasterReducer,
    counter: counterReducer
})

export default rootReducer