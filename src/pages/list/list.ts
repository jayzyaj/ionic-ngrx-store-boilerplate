import { LOGOUT_REQUEST } from './../../store/actions/authenticate';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  authState: Subscription
  auth: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public store: Store<any>) {
  }

  ionViewWillEnter() {
    this.authState = this.store.select<any>('auth').subscribe(state => this.auth = state)
  }

  ionViewWillLeave() {
    this.authState.unsubscribe()
  }

  logout() {
    this.store.dispatch({ type: LOGOUT_REQUEST })
  }

}
