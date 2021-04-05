import * as ActionTypes from './ActionTypes'
import { baseURL } from '../shared/baseURL'

export const addComment = ( comment ) => ({
        type: ActionTypes.ADD_COMMENT,
        payload: comment
})

export const postComment = ( dishId, rating, comment ) => (dispatch) => {
    const newComment = {
        comment: comment,
        rating: rating
    }
    console.log(newComment, dishId, rating, comment)

    const bearer = 'Bearer ' + localStorage.getItem('jwttoken');

    fetch( baseURL + 'dishes/'+ dishId + '/comments', {
        method: 'POST',
        body: JSON.stringify( newComment ),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then( response => {
        if( response.ok ) {
            return response
        }
        else {
            var error = new Error( 'Error ' + response.status + ': ' + response.statusText )
            error.response = response
            throw error
        }
    }, error => {
    //    var errMess = new Error( error.message )
    //    throw errMess 
        throw error
    })
    .then( response => response.json() )
    .catch( error => { 
        console.log( 'POST COMMENTS: ', error.message )
        alert( 'Your comment is not posted\nError: ',error.message )
    });
    dispatch( fetchDishes() );
}

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    return fetch(baseURL + 'dishes')
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error ' + response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
           var errMess = new Error( error.message )
           throw errMess 
        })
        .then( response => response.json() )
        .then( dishes => dispatch( addDishes(dishes) ) )
        .catch( error => dispatch( dishesFailed(error.message) ) )
    // setTimeout( () => {
    //     dispatch(addDishes(DISHES))
    // }, 2000 )
}

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errorMessage) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errorMessage
})

export const fetchComments = () => (dispatch) => {
    return fetch( baseURL + 'comments' )
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error '+ response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( comments => dispatch(addComments(comments) ))
        .catch( error => { dispatch( commentsFailed( error.message  ) ) } )
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const commentsFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errorMessage
})


export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))

    return fetch(baseURL + 'promotions')
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error '+ response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( promotions => dispatch( addPromos(promotions) ) )
        .catch( error => dispatch( promosFailed(error.message) ) )
}

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errorMessage) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errorMessage
})

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = ( errorMessage ) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errorMessage
})

export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading(true))

    return fetch( baseURL + 'leaders')
        .then( response => {
            if( response.ok ) {
                return response
            }
            else {
                var error = new Error( 'Error ' + response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( leaders => dispatch( addLeaders(leaders) ) )
        .catch( error => dispatch( leadersFailed(error.message) ) )    // If you write error only the code will Crash !!
}

export const postFeedback = ( firstname, lastname, email, telnum, 
                            agree, contactType ,message) => () => {
                const newFeedback = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    telnum: telnum,
                    agree: agree,
                    contactType: contactType,
                    message: message
                }

        return fetch( baseURL + 'feedback' , {
            method: 'POST',
            body: JSON.stringify( newFeedback ),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        .then( response => {
            if(response.ok)
                return response
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText )
                error.response = response
                throw error
            }
        }, error => {
            var errMess = new Error( error.message )
            throw errMess
        })
        .then( response => response.json() )
        .then( response => { 
            console.log('Current State is: ' , response)
            alert('Thank you for your feedback!\n' + JSON.stringify(response) ) 
        })
        .catch( error => {
            console.log( 'POST FEEDBACK: ', error.message )
            alert( 'Your Feedback is not posted\nError: ',error.message )
        })
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = errmess => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = favorite => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorite
});

export const fetchFavorites = () => dispatch => {
    dispatch( favoritesLoading(true) );

    const bearer = 'Bearer ' + localStorage.getItem('jwttoken');

    return fetch( baseURL  + 'favorites', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then( response => {
        if( response.ok ) 
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error; 
        }
    }, error => {
        var errmess = new Error( error.message );
        throw errmess;
    }) 
    .then( response => response.json() )
    .then( favorites => dispatch( addFavorites(favorites) ) )                 // Adding Favorites to Redux Store
    .catch( error => dispatch( favoritesFailed( error.message ) ) );
};

export const postFavorites = (dishId) => (dispatch) => {
    
    const bearer = 'Bearer ' + localStorage.getItem('jwttoken');

    return fetch(baseURL + 'favorites/' + dishId, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then( response => {
        if( response.ok )
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    }, error => { throw error })
    .then( response => response.json() )
    .then( favorites => {
        console.log('Dish added to Favorites: ', favorites);
        dispatch( addFavorites( favorites ) );                          // Adding Favorites to Redux Store
    })
    .catch( error => dispatch( favoritesFailed( error.message ) ) );
};

export const deleteFavorites = dishId => dispatch => {
    
    const bearer = 'Bearer ' + localStorage.getItem('jwttoken');
    
    return fetch( baseURL  + 'favorites/' + dishId, {
        method: "DELETE",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then( response => {
        if( response.ok )
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;       
        }
    }, errmess => { throw errmess })
    .then( response => response.json() )
    .then( favorites => {
        console.log('Favorites Deleted: ', favorites);
        dispatch( addFavorites(favorites) );                          // Adding Favorites to Redux Store
    })
    .catch( error => dispatch( favoritesFailed( error.message ) ) ); 
};

export const requestLogin = creds => ({
    type: ActionTypes.LOGIN_REQUEST,
    payload: creds.username                       
});

export const receiveLogin = response => ({
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token                   // try payload: response.token
});

export const loginError = message => ({
    type: ActionTypes.LOGIN_FAILURE,
    message                                    // creds will be transfer to the Reducer function in auth.js which will
                                               // further store it using actions.message 
});

export const loginUser = creds => dispatch => {    
    // We dispatch requestLogin to kickoff the call to the API
    dispatch( requestLogin(creds) );

    return fetch( baseURL + 'users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( creds )                   // These creds are passed in loginUser() function 
    })
    .then( response => {
        if( response.ok )
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error;
        }
    }, error => { throw error; })
    // error => {
    //     var errmess = new Error( error.message );
    //     throw errmess;
    // }) 
    .then( response => response.json() )
    .then( response => {
        if( response.success ) {
            // If login was successful, set the token in local storage
            localStorage.setItem('jwttoken', response.token );
            localStorage.setItem('usercreds', JSON.stringify( creds.username ));         // check session storage
            
            // Dispatch the success action
            dispatch( receiveLogin( response ) );
            dispatch( fetchFavorites() );
            
        }   
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch( error => dispatch( loginError( error.message ) ) );
};

export const requestLogout = () => ({
    type: ActionTypes.LOGOUT_REQUEST
});

export const receiveLogout = () => ({
    type: ActionTypes.LOGOUT_SUCCESS
});

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch( requestLogout() );

    localStorage.removeItem('jwttoken');
    localStorage.removeItem('usercreds');

    dispatch( favoritesFailed("Error 401: Unauthorized") );
    dispatch( receiveLogout() );
};

export const checkingUser = () => ({
    type: ActionTypes.CHECKING_USER
});

export const userChecked = user => ({
    type: ActionTypes.USER_CHECKED,
    payload: user.username
});

export const checkUser = () => (dispatch) => {
    dispatch( checkingUser() );
    
    const bearer = 'Bearer ' + localStorage.getItem('jwttoken');

    return fetch( baseURL + 'users/checkjwttoken', {
        method: "GET",
        headers: {
            'Authorization': bearer
        },
        credentials: "same-origin"                  
    })
    .then( response => {
        if( response.ok )
            return response;
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText );
            error.response = response;
            throw error;
        }
    }, error => { throw error; })

    .then( response => response.json() )
    .then( response => {
        if( response.success ) {

            localStorage.setItem('usercreds', JSON.stringify( response.user.username ));         // check session storage
            
            // Dispatch the success action
            dispatch( userChecked( response.user ) );
            // dispatch( fetchFavorites() );
            
        }   
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch( error => dispatch( loginError( error.message ) ) );
};