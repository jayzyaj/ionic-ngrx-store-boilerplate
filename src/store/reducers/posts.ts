import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILED } from './../actions/posts';
import { ActionReducer, Action } from '@ngrx/store';
import { PostState } from '../store';

const initialState: PostState = {
    posts: [],
    fetching: false,
    error: {},
    posting: false
}

export function postsReducer(state = initialState, action: Action) {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                fetching: true,
                // USERS: (<any>action).data.USERS
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                fetching: false,
                posts: (<any>action).payload
            }
        case FETCH_POSTS_FAILED:
            return {
                ...state,
                fetching: false,
                error: (<any>action).payload
            }
        default:
            return state;
    }
}