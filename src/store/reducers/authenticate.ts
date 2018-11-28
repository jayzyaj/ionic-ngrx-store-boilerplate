import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED } from './../actions/authenticate';
import { AuthState } from './../store';
import { Action } from '@ngrx/store';
import { PostState } from '../store';

const initialState: AuthState = {
    isAuthenticated: false,
    authenticating: false,
    unauthenticating: false,
    token: null,
    error: null
}

export function authReducer(state = initialState, action: Action) {
    switch (action.type) {
        case LOGIN_REQUEST: // Sign in request
            return {
                ...state,
                authenticating: true,
            }
        case LOGIN_SUCCESS: // Sign in success
            return {
                ...state,
                authenticating: false,
                isAuthenticated: true,
                token: (<any>action).payload.data.token
            }
        case LOGIN_FAILED: // Sign in failed
            return {
                ...state,
                authenticating: false,
                error: (<any>action).payload
            }
        case LOGOUT_REQUEST: // Sign out request
            return {
                ...state,
                unauthenticating: true
            }
        case LOGOUT_SUCCESS: // Signout success
            return {
                ...state,
                unauthenticating: false,
                isAuthenticated: false,
                token: null
            }
        case LOGOUT_FAILED: // Signout failed
            return {
                ...state,
                unauthenticating: false,
                error: (<any>action).payload
            }
        default:
            return state;
    }
}