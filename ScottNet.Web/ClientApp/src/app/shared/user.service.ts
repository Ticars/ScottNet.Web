import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { BaseService } from './base.service';
import { IUserRegistration, IAuth, Auth } from './accountModels';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  baseUrl: string = '';
  authObj: Auth
  // Observable navItem source
  public _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();


  constructor(private http: HttpClient) {
    super();
    var authString = localStorage.getItem('authObject')
    if (authString) {
      this.authObj = new Auth(JSON.parse(authString));
      console.log("Token expires in: " + this.authObj.expiresIn());
      // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
      // header component resulting in authed user nav links disappearing despite the fact user is still logged in
      this._authNavStatusSource.next(!!this.authObj);
    }
   
    this.baseUrl = '/api'
  }


  register(email: string, password: string, firstName: string, lastName: string): Observable<IUserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName });
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<IUserRegistration>(this.baseUrl + "/account", body, httpOptions);

  }

  login(userName, password): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .post<IAuth>(
        this.baseUrl + '/auth/login',
        JSON.stringify({ userName, password }),
        { headers: this.getHttpHeaders() }
      ).pipe(
        map((res) => {
          this.setLogin(res);
          return true;
        }),
        catchError((error) => {
          if (error.status === 401) {
            return of(false);
          } else {
            return this.handleError(error)
   
          }
        })
      )
  }


  setLogin(auth: IAuth) {
    var authObj = new Auth(auth)
    console.log("login authtoken: " + auth.token)
    localStorage.setItem('authObject', JSON.stringify(authObj));
    this.authObj = authObj
    this._authNavStatusSource.next(true);
  }

  logout() {
    localStorage.removeItem('authObject');
    this.authObj = null
    this._authNavStatusSource.next(false);
  }

}
