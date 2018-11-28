import { Store } from '@ngrx/store';
import { LOGIN_FAILED } from './../actions/authenticate';
import { App } from 'ionic-angular';
import { ToastProvider } from './../../providers/popup-messages/toast';
import { AuthProvider } from './../../providers/api/authenticate';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Effect, Actions, ofType } from '@ngrx/effects'
import * as authActions from '../actions/authenticate'
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RESET_STATE } from '../actions/resetState';

@Injectable()
export class AuthEffect {

    constructor(public actions$: Actions, public authApi: AuthProvider, public toastMsg: ToastProvider, public app: App,
        public storage: Storage, public store: Store<any>) { }

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
    errorSignIn$ = this.actions$.pipe(
        ofType<any>(authActions.LOGIN_FAILED),
        map(({ payload }) => {
            console.log('Effect message', payload)
            this.toastMsg.showNormalToastMessage('Invalid email or password')
        })
    )

    @Effect({ dispatch: false })
    successSignIn$ = this.actions$.pipe(
        ofType<any>(authActions.LOGIN_SUCCESS),
        tap(async (response: any) => {
            await this.storage.set('token', response.payload.data.token)
            await this.app.getActiveNav().setRoot("ListPage")
        })
    )

    @Effect()
    deAuthenticate$ = this.actions$.ofType(authActions.LOGOUT_REQUEST)
        .pipe(
            switchMap(() => {
                return this.authApi.signOut().pipe(
                    map((response: any) => ({ type: authActions.LOGOUT_SUCCESS, payload: response })),
                    catchError(error => of({ type: authActions.LOGOUT_FAILED, payload: error }))
                )
            })
        )

    @Effect({ dispatch: false })
    errorSignOut$ = this.actions$.pipe(
        ofType<any>(authActions.LOGOUT_FAILED),
        map(({ payload }) => {
            console.log('Effect message', payload)
            this.toastMsg.showNormalToastMessage('Something went wrong.')
        })
    )

    @Effect({ dispatch: false })
    successSignOut$ = this.actions$.pipe(
        ofType<any>(authActions.LOGOUT_SUCCESS),
        tap(async (response: any) => {
            await this.app.getActiveNav().setRoot("HomePage")
            await this.storage.remove('token')
        })
    )

}