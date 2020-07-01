import { combineReducers } from 'redux'

import costTypesReducer from './costTypesReducer'
import costItemsReducer from './costItemsReducer'
import counterReducer from './counterReducer'

const rootReducer = combineReducers({
    costTypes: costTypesReducer,
    costItems: costItemsReducer,
    counter: counterReducer
})

export default rootReducer