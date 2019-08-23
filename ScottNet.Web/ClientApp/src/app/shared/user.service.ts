import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { BaseService } from './base.service';
import { IUserRegistration, IAuth, ILoginResults } from './accountModels';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  baseUrl: string = '';
  authObj: IAuth
  // Observable navItem source
  public _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  //public jwtHelper: JwtHelperService,
  constructor( private http: HttpClient, private router: Router) {
    super();
    var authString = localStorage.getItem('authObject')
    if (authString) {
      this.authObj = JSON.parse(authString);
      // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
      // header component resulting in authed user nav links disappearing despite the fact user is still logged in
      this._authNavStatusSource.next(!!this.authObj);
    }
   
    this.baseUrl = '/api'
  }

  getAuthentication() : IAuth{
    var authString = localStorage.getItem('authObject')
    if (authString) {
      return JSON.parse(authString);
    } else {
      return null
    }
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    let body = JSON.stringify({ email, password, firstName, lastName });
    
    return this.http.post<IUserRegistration>(this.baseUrl + "/account", body);

  }

  confirmEmail(userId: string, token: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + "/account/confirmEmail", JSON.stringify({ userId: userId, token: token }));
  }

  resendConfirmation(email: string): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + "/account/resendEmail", JSON.stringify(email));
  }

  login(userName, password): Observable<ILoginResults> {
    return this.http
      .post<IAuth>(
        this.baseUrl + '/auth/login',
        JSON.stringify({ userName, password })
      ).pipe(
        map((res) => {
          this.setLogin(res)
          return { valid: true, error: '', statusCode: 200 };
        }),
        catchError((error) => {
          return of({ valid: false, error: error.error, statusCode: error.status })
        })
      )
  }

  refresh(): Observable<IAuth> {
    var auth = this.getAuthentication();
    if (auth) {
      return this.http
        .post<IAuth>(
          this.baseUrl + '/auth/refresh',
          JSON.stringify(auth.refreshToken)
        ).pipe(
          map((res) => {
            this.setLogin(res);
            return res;
          })
        )
    } else {    //not authenticated
      console.log('error in refresh')
      return of(null);
    }
  }

  public isAuthenticated(): boolean {
    const auth: IAuth = JSON.parse(localStorage.getItem('authObject'));
    return auth != null;
  }

  setLogin(auth: IAuth) {
    console.debug("login authtoken: " + auth.token)
    localStorage.setItem('authObject', JSON.stringify(auth));
    this.authObj = auth
    this._authNavStatusSource.next(true);
  }

  logout() {
    let auth = this.getAuthentication();
    if (auth) {
      console.debug('user.logout(): logging user out')
      this.http
        .post<IAuth>(
          this.baseUrl + '/auth/logout',
          JSON.stringify(auth.refreshToken)
        ).toPromise()

      localStorage.removeItem('authObject');
    } else {
      console.debug('user.logout(): not logged in')
    }
    
    this.authObj = null
    this._authNavStatusSource.next(false);
    this.router.navigate(['/login'])
  }

  passwordResetRequest(lastName: string, email: string) {
    return this.http.post<boolean>(this.baseUrl + "/account/passwordResetRequest", JSON.stringify({ lastName: lastName, email: email }));
  }

  passwordReset(userId: string, token: string, password: string) {
    return this.http.post<boolean>(this.baseUrl + "/account/passwordReset", JSON.stringify({ userId: userId, token: token, password: password }));
  }


}
