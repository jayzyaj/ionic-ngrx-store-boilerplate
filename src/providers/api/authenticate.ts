import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {}

  signIn(data) {
    return this.http.post('https://yourapi-server-o', data).pipe(
      catchError((error: any) => Observable.throw(error))
    )
  }

}
