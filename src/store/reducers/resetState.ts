import { Action } from '@ngrx/store';
import { RESET_STATE } from '../actions/resetState';

export function resetStateReducer(state: any, action: Action) {
    switch (action.type) {
        case RESET_STATE:
            state = undefined
        default:
            return state;
    }
}