import { PostsProvider } from './../../providers/api/posts';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects'
import * as postsActions from '../actions/posts'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class PostsEffect {

    constructor(public actions$: Actions, public postApi: PostsProvider) { }

    @Effect()
    fetchPosts$ = this.actions$.ofType(postsActions.FETCH_POSTS)
        .pipe(
            switchMap(() => {
                return this.postApi.getPosts().pipe(
                    map((posts: any) => ({ type: postsActions.FETCH_POSTS_SUCCESS, payload: posts })),
                    catchError(error => of({ type: postsActions.FETCH_POSTS_FAILED, payload: error }))
                )
            })
        )

}
