import * as ActionTypes from './ActionTypes'
import { baseURL } from '../shared/baseURL'          // No need as we are using Firebase
import { auth, firestore, fireauth, firebasestore } from '../firebase/firebase'

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

export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true))

    return firestore.collection('dishes').get()
        .then( querySnapshot => {
            let dishes = [];
            querySnapshot.forEach( doc => {
                const data = doc.data();                    // Data and Id are separately received
                const _id = doc.id;
                dishes.push({ _id, ...data });              // what is the use of ... Spread operator here ?    
                                        // Adding {} is important to make it whole an object to work with Spread operator
            });
            return dishes;
        })
        .then( dishes => dispatch( addDishes(dishes) ) )
        .catch( error => dispatch( dishesFailed(error.message) ) );
}

export const commentFailed = (errorMessage) => ({
    type: ActionTypes.COMMENTS_FAILED,
    message: errorMessage
})

export const postingComment = () => ({
    type: ActionTypes.POSTING_COMMENTS
})

export const postComment = ( dishId, rating, comment ) => (dispatch) => {
   
    if( !auth.currentUser ) {
        console.log( 'No User logged in! \n Can\'t post Comments');
        alert('No User logged in! \n Can\'t post Comments')
        return;
    }
    var currentUser = auth.currentUser;

    dispatch( postingComment() );

    
    const newComment = {
        comment: comment,
        rating: parseInt(rating),
        // updatedAt: firebasestore.FieldValue.serverTimestamp(),        // It can only be used inside add() or update() or set()
        user: {
            displayName: currentUser.displayName,
            email: currentUser.email,
            user_id: currentUser.uid,
        }
    }
    console.log(newComment)
    
    return firestore.collection('dishes').doc( dishId ).update({
        comments: firebasestore.FieldValue.arrayUnion({ updatedAt: firebasestore.Timestamp.now(), ...newComment })
        })
        .then( () => {
            dispatch( fetchDishes() );
        })
        .catch( error => { 
            console.log( 'POST COMMENTS: ', error.message )
            alert( 'Your comment is not posted\nError: ',error.message )
            dispatch( commentFailed(error.message) );
        });
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

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true))

    return firestore.collection('promotions').get()
        .then( snapshot => {
            let promos = [];
            snapshot.forEach( doc => {
                const data = doc.data();
                const _id = doc.id;
                promos.push({ _id, ...data });
            });
            return promos;
        })
        .then( promotions => dispatch( addPromos(promotions) ) )
        .catch( error => dispatch( promosFailed(error.message) ) )
}

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

    return firestore.collection('leaders').get()
        .then( snapshot => {
            let promos = [];
            snapshot.forEach( doc => {
                const data = doc.data();
                const _id = doc.id;
                promos.push({ _id, ...data });
            });
            return promos;
        })
        .then( leaders => dispatch( addLeaders(leaders) ) )
        .catch( error => dispatch( leadersFailed(error.message) ) )    // If you write error only the code will Crash !!
}

export const postFeedback = ( firstname, lastname, email, telnum, agree, contactType ,message) => () => {
        const newFeedback = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            telnum: parseInt(telnum),
            agree: agree,
            contactType: contactType,
            message: message
        }
        console.log({ createdAt: firebasestore.FieldValue.serverTimestamp(), ...newFeedback })

        return firestore.collection('feedback').add({ createdAt: firebasestore.FieldValue.serverTimestamp(), ...newFeedback })
        .then( response => { 
            console.log('Current State is: ' , response)
            alert('Thank you for your feedback!\n ID Generated is: ' + response.id ) 
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

    if( !auth.currentUser ) {
        console.log( 'No User logged in! \n Can\'t display any Favorites');
        return;
    }
    var user = auth.currentUser;

    dispatch( favoritesLoading() );

    return firestore.collection('favorites').where( 'user', '==', user.uid ).get()
        .then( querySnapshot => {
            let favorites = { user: user.email, dishes: [] };
            querySnapshot.forEach( doc => {
                const data = doc.data();
                favorites.dishes.push( data.dish );
            })
            console.log( favorites )
            return favorites; 
        })    
        .then( favorites => dispatch( addFavorites(favorites) ) )                 // Adding Favorites to Redux Store
        .catch( error => dispatch( favoritesFailed( error.message ) ) );
};

export const postFavorites = (dishId) => (dispatch) => {
    
    if( !auth.currentUser ) {
        console.log( 'No User logged in! \n Can\'t post any Favorites');
        return;
    }

    return firestore.collection('favorites').add({
            user: auth.currentUser.uid,
            dish: dishId    
        })
        .then( docRef => {
            console.log( 'Favorite created with ID: ', docRef.id)
            dispatch( fetchFavorites() );
        })
        .catch( error => dispatch( favoritesFailed( error.message ) ) );
};

export const deleteFavorites = dishId => dispatch => {

    if( !auth.currentUser ) {
        console.log( 'No User logged in! \n Can\'t delete any Favorites');
        return;
    }
    var user = auth.currentUser;

    return firestore.collection('favorites').where( 'user', '==', user.uid ).where( 'dish', '==', dishId ).get()
        .then( snapshot => {
            console.log( snapshot )
            snapshot.forEach( doc => {
                console.log( doc.id );
                firestore.collection('favorites').doc( doc.id ).delete()
                    .then( () => {
                        dispatch( fetchFavorites() );
                    })
                    .catch( error => console.log( error.message ) ); 
            })
        }) 
        .catch( error => dispatch( favoritesFailed( error.message ) ) ); 
};

export const requestLogin = () => ({
    type: ActionTypes.LOGIN_REQUEST            
});

export const receiveLogin = user => ({
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user                               // try payload: response.token
});

export const loginError = message => ({
    type: ActionTypes.LOGIN_FAILURE,
    message                                    // creds will be transfer to the Reducer function in auth.js which will
                                               // further store it using actions.message 
});

export const loginUser = creds => dispatch => {    
    // We dispatch requestLogin to kickoff the call to the API
    dispatch( requestLogin(creds) );
    return auth.signInWithEmailAndPassword( creds.username, creds.password )
        .then( () => {
            var user = auth.currentUser;
            localStorage.setItem('user', JSON.stringify(user.email) );
                 
            dispatch( fetchFavorites() );
            dispatch( receiveLogin(user) );
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

    return auth.signOut()
    .then( () => {
        localStorage.removeItem('user');
    
        dispatch( favoritesFailed("User Logged Out: Can't fetch favorites") );
        dispatch( receiveLogout() );
    }) 
    .catch( error => dispatch( loginError( error.message ) ) );
};

export const checkUser = () => (dispatch) => {

    auth.onAuthStateChanged( user => {
        if (user) {
            dispatch( receiveLogin(user) );
            dispatch( fetchFavorites() );
        } 
        else {
            console.log('No User is logged in ! \n Please log in again.');
            dispatch( loginError() );
        }
      });
};

export const googleLogin = () => dispatch => {
    const provider = new fireauth.GoogleAuthProvider();

    auth.signInWithPopup( provider )
        .then( result => {
            var user = result.user;
            console.log('auth.currentUser: ', auth.currentUser, '\n user: ', user);
            localStorage.setItem('user', JSON.stringify(user.email));
        
            dispatch(fetchFavorites());
            dispatch(receiveLogin(user));
        })
        .catch( error => dispatch( loginError( error.message ) ) );
};