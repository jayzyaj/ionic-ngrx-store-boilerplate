import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient) {}

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      catchError((error: any) => Observable.throw(error))
    )
  }

}
