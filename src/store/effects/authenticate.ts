import { NavController, App } from 'ionic-angular';
import { ToastProvider } from './../../providers/popup-messages/toast';
import { AuthProvider } from './../../providers/api/authenticate';
import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects'
import * as authActions from '../actions/authenticate'
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffect {

    constructor(public actions$: Actions, public authApi: AuthProvider, public toastMsg: ToastProvider, public app: App) { }

    @Effect()
    authenticate$ = this.actions$.ofType(authActions.LOGIN_REQUEST)
        .pipe(
            switchMap((data: any) => {
                return this.authApi.signIn(data.payload).pipe(
                    map((response: any) => ({ type: authActions.LOGIN_SUCCESS, payload: response })),
                    catchError(error => of({ type: authActions.LOGIN_FAILED, payload: error }))
                )
            })
        )

    @Effect({ dispatch: false })
    error$ = this.actions$.pipe(
        ofType<any>(authActions.LOGIN_FAILED),
        map(({ payload }) => {
            console.log('Effect message', payload)
            this.toastMsg.showNormalToastMessage('Invalid email or password')
        })
    )

    @Effect({ dispatch: false })
    success$ = this.actions$.pipe(
        ofType<any>(authActions.LOGIN_SUCCESS),
        tap(() => {
            this.app.getActiveNav().setRoot("ListPage")
        })
    )

}