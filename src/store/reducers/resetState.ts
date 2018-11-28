import { Action, ActionReducer } from '@ngrx/store';
import { RESET_STATE } from '../actions/resetState';

export function resetStateReducer(reducer: ActionReducer<any>) {
    return function (state: any, action: any) {
        if (action.type == RESET_STATE) {
            state = undefined
        }
        return reducer(state, action)
    }
}