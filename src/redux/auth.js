                                    // These are the Reducer functions
import * as ActionTypes from './ActionTypes'

// The auth reducer. The starting state sets authentication based on a token being in local storage.
// In a real app, we would also want a util to check if the token is expired.

export const Auth = ( state={
    isLoading: false,
    isAuthenticated: localStorage.getItem('jwttoken') ? true: false,
    token: localStorage.getItem('jwttoken'),
    user: localStorage.getItem('usercreds') ? JSON.parse( localStorage.getItem('usercreds') ) : null,
    errMessage: null
}, action) => {
    switch ( action.type ) {
        case ActionTypes.LOGIN_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: false, user: action.payload }
            
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: true, token: action.token, errMessage: '' }
            
        case ActionTypes.LOGIN_FAILURE:
            return { ...state, isLoading: false, isAuthenticated: false, errMessage: action.message }
            
        case ActionTypes.LOGOUT_REQUEST:
            return { ...state, isLoading: true, isAuthenticated: true }
            
        case ActionTypes.LOGOUT_SUCCESS:
            return { ...state, isLoading: false, isAuthenticated: false, token: '', user: null }
            
        case ActionTypes.CHECKING_USER:
            return { ...state, isLoading: true, isAuthenticated: false, user: null }

        case ActionTypes.USER_CHECKED:
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload }
        default:
            return state;
    }
} 