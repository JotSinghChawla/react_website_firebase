import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createForms } from 'react-redux-form'
import { Dishes } from './dishes'
import { Comments } from './comments'
import { Leaders } from './leaders'
import { Promotions } from './promotions'
import { Favorites } from './favorites'
import { Auth } from './auth'
import thunk from 'redux-thunk'
import logger from "redux-logger"
import { InitialFeedback } from './forms'
import { composeWithDevTools } from 'redux-devtools-extension'

export const ConfigureStore = () => {
     const store = createStore( 
          combineReducers({
               dishes : Dishes,
               comments: Comments,
               promotions: Promotions, 
               leaders: Leaders, 
               favorites: Favorites,
               auth: Auth,
               ...createForms({
                    feedback: InitialFeedback
               })
          }), 
          composeWithDevTools(applyMiddleware(thunk, logger))
      )
     return store;
}


// import {createStore} from 'redux';
// import { Reducer, initialState } from './reducer'

// export const ConfigureStore = () => {
//     const store = createStore(
//         Reducer, // reducer
//         initialState, // our initialState
//     );

//     return store;
// }