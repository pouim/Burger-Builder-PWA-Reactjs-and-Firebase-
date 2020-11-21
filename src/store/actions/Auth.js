import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
       type: actionTypes.AUTH_START
    };
};

export const authSucceed = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCEED,
        token: token,
        userId: userId
    };
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSingup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyxdrwjzhBKJBugNBE-6ccxVqYGYbaWjA';
        if(!isSingup) {
            url= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyxdrwjzhBKJBugNBE-6ccxVqYGYbaWjA';
        }
        axios.post(url, authData)
             .then(response => {
                 console.log(response);
                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                 localStorage.setItem('token', response.data.idToken);
                 localStorage.setItem('expirationDate', expirationDate);
                 localStorage.setItem('userId', response.data.localId);
                 dispatch(authSucceed(response.data.idToken, response.data.localId));
                 dispatch(checkAuthTimeout(response.data.expiresIn));
             })
             .catch(err => {
                 console.log(err);
                 dispatch(authFailed(err.response.data.error));
             });
    };
};

export const setAuthRedirectPath = (path) => {
   return {
          type: actionTypes.SET_AUTH_REDIRECT_PATH,
          path: path
   }; 
    
};

export const authCheckStatus = () => {
   return dispatch => {
          const token = localStorage.getItem('token');
          if( !token ) {
             dispatch(logout());
          } else {
             const expirationDate = new Date(localStorage.getItem('expirationDate'));
             if (expirationDate <= new Date()) {
                 dispatch(logout())
             } else {
                 const userId = localStorage.getItem('useId');
                 dispatch(authSucceed(token, userId));
                 dispatch(checkAuthTimeout(( expirationDate.getTime() - new Date().getTime()) / 1000 ));
             }
             
          }
          

   };
};