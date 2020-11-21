import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};


const authReducer = (state = initialState, action) => {
          switch(action.type) {
            case actionTypes.AUTH_START:
               return {
                   ...state,
                   error: null,
                   loading: true
               };

            case actionTypes.AUTH_SUCCEED:
               return {
                   ...state,
                   error: null,
                   loading: false,
                   token: action.token,
                   userId: action.userId
               };

            case actionTypes.AUTH_FAILED:
               return {
                   ...state,
                   error: action.error,
                   loading: false
               };   

            case actionTypes.AUTH_LOGOUT:
               return {
                   ...state,
                   token: null,
                   userId: null
               };   

            case actionTypes.SET_AUTH_REDIRECT_PATH:
                return {
                    ...state,
                    authRedirectPath: action.path
                };   
               
            default:
                return state;   
          }
};


export default authReducer
