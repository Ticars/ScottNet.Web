import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from './base.service';
import { UserRegistration, Authorization } from '.';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = '/api'
  }


  register(email: string, password: string, firstName: string, lastName: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName });

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<UserRegistration>(this.baseUrl + "/account", body, httpOptions);

  }

  login(userName, password) : Observable<Authorization> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .post<Authorization>(
        this.baseUrl + '/auth/login',
        JSON.stringify({ userName, password }),
        httpOptions
      );
  }

  setLogin(auth: Authorization) {
    console.log("login authtoken: " + auth.auth_token)
    localStorage.setItem('auth_token', auth.auth_token);
    this.loggedIn = true;
    this._authNavStatusSource.next(true);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
