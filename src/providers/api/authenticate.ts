import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {}

  signIn(data) {
    console.log('Provider data', data)
    return this.http.post('https://topserve-api.s17-host.com/v1/d/auth/login', data).pipe(
      catchError((error: any) => Observable.throw(error))
    )
  }

}
