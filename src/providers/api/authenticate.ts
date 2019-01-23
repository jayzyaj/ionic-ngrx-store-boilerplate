import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {}

  signIn(data) {
    console.log('Provider data', data)
    return this.http.post('https://your-desired-url.com/v1/auth/login', data).pipe(
      catchError((error: any) => Observable.throw(error))
    )
  }

  signOut() {
    return this.http.delete('https://your-desired-url.com/api/v1/logout').pipe(
      catchError((error: any) => Observable.throw(error))
    )
  }

}
