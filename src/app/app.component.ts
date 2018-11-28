import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  authState: any
  rootPage: any = "HomePage";

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public store: Store<any>) {
    this.store.select<any>('auth').subscribe(state => {
      if (state.isAuthenticated) this.rootPage = "ListPage"
      else this.rootPage = "HomePage"
    })
    this.initializeApp()
  }

  async initializeApp() {
    await this.platform.ready()
    this.statusBar.styleDefault()
    this.splashScreen.hide()
  }
}

