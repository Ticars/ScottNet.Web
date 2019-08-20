import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UserService, IAuth } from ".";
import { Observable, throwError, of, BehaviorSubject } from "rxjs";
import { catchError, switchMap, filter, take } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public auth: UserService, private router: Router) { }

  private addHeaders(request: HttpRequest<any>, authorization: IAuth) {
    let token = authorization ? authorization.token : ''
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let authData = this.auth.getAuthentication();
    console.debug('executing request: ' + request.url)

    let initialRequest = this.addHeaders(request, authData)

    return next.handle(initialRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            //if refresh fails 401, logout
            if (request.url.indexOf("/auth/refresh") >= 0) {
              this.auth.logout();
            }

            //for any authentication 401, throw error
            if (request.url.indexOf("/auth/") >= 0) {
              console.log('401 error in auth call')
              return throwError(error)
            }

            //for any non-authentication calls, check for token expired, else logout
            if (authData
              && error.headers.has('token-expired')) {
              if (!this.isRefreshing) {
                this.isRefreshing = true;
                this.refreshTokenSubject.next(null)

                //Genrate params for token refreshing
                console.debug('httpInterceptor: token expired, refresh token')
                return this.auth.refresh().pipe(
                  switchMap(retryAuth => {
                    if (retryAuth) {
                      this.isRefreshing = false;
                      this.refreshTokenSubject.next(retryAuth);
                      let retryRequest = this.addHeaders(request, retryAuth)
                      console.debug(`calling ${retryRequest.url} with refreshed auth token`)
                      return next.handle(retryRequest)
                    } else {
                      console.debug('httpInterceptor: Failed to refresh token')
                      return of(null)
                    }
                  }),
                  catchError((refreshError) => {
                    console.log("httpInterceptor: Error refreshing login token")
                    this.auth.logout()
                    return throwError(refreshError)
                  })
                )
              } else {
                return this.refreshTokenSubject.pipe(
                  filter(token => token != null),
                  take(1),
                  switchMap(auth => {
                    return next.handle(this.addHeaders(request, auth));
                  }));
              }

            }  //no auth data or token not expired
            else {
              this.auth.logout()
              console.debug("httpInterceptor: user not logged in error")
              return throwError(error)
            }
          }//if of 401/expired token check
          else {
            console.debug('httpInterceptor: non 401 http error')
            return throwError(error)  //non-401 token expired call
          }
        })  //catch error of primary request
      ) //pipe of primary call;
  }  //intercept function
}  //class
