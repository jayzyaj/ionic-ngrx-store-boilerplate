import { ToastProvider } from './../providers/popup-messages/toast';
import { AuthProvider } from './../providers/api/authenticate';
import { UsersProvider } from './../providers/api/users';
import { effects } from './../store/effects/index';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostsProvider } from '../providers/api/posts';

// Redux
import { storeLogger } from 'ngrx-store-logger';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { rootReducer } from '../store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HttpClientModule } from '@angular/common/http';

export function logger(reducer: ActionReducer<any>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = [logger];

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    StoreModule.forRoot(rootReducer, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PostsProvider,
    UsersProvider,
    AuthProvider,
    ToastProvider
  ]
})
export class AppModule {}
