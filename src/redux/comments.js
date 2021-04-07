// import { COMMENTS } from '../shared/comments' 
import * as ActionTypes from './ActionTypes'

export const Comments = (state = {
    isLoading: false,
    errorMessage: null
}, action) => {
    switch (action.type) {
        case ActionTypes.POSTING_COMMENTS:
            return { ...state, isLoading: true, errorMessage: null}

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, isLoading: false, errorMessage: action.message}
            
        default:
            return state
    }
}