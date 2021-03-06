                                    // These are the Reducer functions
import * as ActionTypes from './ActionTypes'

// The auth reducer. The starting state sets authentication based on a token being in local storage.
// In a real app, we would also want a util to check if the token is expired.

export const Auth = ( state={
    isLoading: false,
    isAuthenticated: false,
    user: null,
    errMessage: null
}, action) => {
    switch ( action.type ) {
        case ActionTypes.LOGIN_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: false }
            
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, errMessage: '' }
            
        case ActionTypes.LOGIN_FAILURE:
            return { ...state, isLoading: false, isAuthenticated: false,user: null, errMessage: action.message }
            
        case ActionTypes.LOGOUT_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: true }
            
        case ActionTypes.LOGOUT_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: false, user: null }
        default:
            return state;
    }
} 