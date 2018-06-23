import _venues from '../data/venues'
import {combineReducers} from 'redux'


function venues(state = _venues, action) {
    switch (action.type) {
        case 'REMOVE_VENUE': return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
        case 'ADD_VENUE': return [...state, action.venues]
        case 'LOAD_VENUES': return action.venues
        default: return state

    }

    
}

const rootReducer = combineReducers({venues})

export default rootReducer