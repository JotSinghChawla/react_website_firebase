                                    // These are the Reducer functions
import * as ActionTypes from './ActionTypes'

export const Favorites = ( state = {
    isLoading: true,
    errMessage: null,
    favorites: null
}, action) => {
    switch ( action.type ) {
        case ActionTypes.ADD_FAVORITES:
            return { ...state, isLoading: false, errMessage: null, favorites: action.payload };

        case ActionTypes.FAVORITES_LOADING:
        return { ...state, isLoading: true, errMessage: null, favorites: null };

        case ActionTypes.FAVORITES_FAILED:
        return { ...state, isLoading: false, errMessage: action.payload, favorites: null };

        default:
            return state;
    }
}