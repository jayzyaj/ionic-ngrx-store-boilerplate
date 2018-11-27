import { FETCH_USERS } from './../../store/actions/users';
import { FETCH_POSTS } from './../../store/actions/posts';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: Observable<any>

  constructor(public navCtrl: NavController, public store: Store<any>) {}

  ionViewWillEnter() {
    this.store.select<any>('posts').subscribe(state => console.log('Post state', state))
    this.store.select<any>('users').subscribe(state => console.log('User state', state))
  }

  ionViewDidLoad() {
    this.getPosts()
    this.getUsers()
  }

  getPosts() {
    this.store.dispatch({ type: FETCH_POSTS })
  }

  getUsers() {
    this.store.dispatch({ type: FETCH_USERS })
  }

}
