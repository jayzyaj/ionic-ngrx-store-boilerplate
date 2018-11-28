import { LOGIN_REQUEST } from './../../store/actions/authenticate';
import { FETCH_USERS } from './../../store/actions/users';
import { FETCH_POSTS } from './../../store/actions/posts';
import { Observable, Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  form: any
  posts: Observable<any>
  auth: any

  constructor(public navCtrl: NavController, public store: Store<any>, public formBuilder: FormBuilder,
    public toastCtrl: ToastController) {
    this.form = formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  ionViewWillEnter() {
    this.store.select<any>('posts').subscribe(state => console.log('Post state', state))
    this.store.select<any>('users').subscribe(state => console.log('User state', state))
    this.store.select<any>('auth').subscribe(state => this.auth = state)
  }

  ionViewDidLoad() {
    this.getPosts()
    this.getUsers()
  }

  signIn() {
    this.store.dispatch({ type: LOGIN_REQUEST, payload: this.form.value })
  }

  getPosts() {
    this.store.dispatch({ type: FETCH_POSTS })
  }

  getUsers() {
    this.store.dispatch({ type: FETCH_USERS })
  }

}
