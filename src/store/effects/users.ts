import { UsersProvider } from './../../providers/api/users';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects'
import * as usersActions from '../actions/users'
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UsersEffect {

    constructor(public actions$: Actions, public userApi: UsersProvider) { }

    @Effect()
    fetchUsers$ = this.actions$.ofType(usersActions.FETCH_USERS)
        .pipe(
            switchMap(() => {
                return this.userApi.getUsers().pipe(
                    map((users: any) => ({ type: usersActions.FETCH_USERS_SUCCESS, payload: users })),
                    catchError(error => of({ type: usersActions.FETCH_USERS_FAILED, payload: error }))
                )
            })
        )

}
