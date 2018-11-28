import { LOGIN_REQUEST, LOGIN_FAILED, LOGIN_SUCCESS } from './../actions/authenticate';
import { AuthState } from './../store';
import { Action } from '@ngrx/store';
import { PostState } from '../store';

const initialState: AuthState = {
    isAuthenticated: false,
    authenticating: false,
    token: null,
    error: null
}

export function authReducer(state = initialState, action: Action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                authenticating: true,
                // USERS: (<any>action).data.USERS
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticating: false,
                isAuthenticated: true,
                token: (<any>action).payload.data.token
            }
        case LOGIN_FAILED:
            return {
                ...state,
                authenticating: false,
                error: (<any>action).payload
            }
        default:
            return state;
    }
}