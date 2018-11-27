import { FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILED } from './../actions/users';
import { UserState } from './../store';
import { Action } from '@ngrx/store';
import { PostState } from '../store';

const initialState: UserState = {
    users: [],
    fetching: false,
    error: {}
}

export function usersReducer(state = initialState, action: Action) {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                fetching: true,
                // USERS: (<any>action).data.USERS
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                fetching: false,
                users: (<any>action).payload
            }
        case FETCH_USERS_FAILED:
            return {
                ...state,
                fetching: false,
                error: (<any>action).payload
            }
        default:
            return state;
    }
}