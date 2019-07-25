import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserService } from '.';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService {

  constructor(private http: HttpClient, private userService:UserService) {
    super()
  }

  postImage(formData: FormData): Observable<any> {
    return this.http
      .post(
        '/api/Photo',
        formData,
        { reportProgress: true, observe: 'events', headers: new HttpHeaders({ 'Authorization': `Bearer  ${this.userService.authObj.token}` }) }
      )
      
  }
}
