import { Injectable, NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';

// Http imports
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

    token: any

    constructor(private storage: Storage) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginUrl = '/auth/login' // Http url to be passed in that requires no token or headers
        console.log(req.url)
        if (req.url.search(loginUrl) === -1) { // Perform this function inside the condition if token is not needed in the given url in the variable
            console.log('An http request happened with Token required')
            return fromPromise(this.storage.get('token')).pipe(switchMap(token => {
                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`
                })
                const dupReq = req.clone({ headers });
                return next.handle(dupReq).pipe(
                    map((event: HttpEvent<any>) => {
                        return event;
                    })
                )
            }))
        } else {
            console.log('An http request happened without Token required')
            return next.handle(req)
        }
    }

}

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
    ]
})

export class HeaderInterceptorModule { }