import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PostsProvider {

  constructor(public http: HttpClient) {}

  getPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      catchError((error: any) => Observable.throw(error))
    )
  }

}
