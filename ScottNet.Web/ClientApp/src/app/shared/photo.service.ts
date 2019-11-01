import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UserService } from '.';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { IImageGroup } from './photoModels';

@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseService {

  constructor(private http: HttpClient, private userService:UserService) {
    super()
  }

  testSecure(): Observable<string[]> {
    return this.http.get<string[]>('/api/secure/TestSecure')
  }

  postImage(formData: FormData): Observable<any> {
    return this.http
      .post(
        '/api/Photo',
        formData,
        { reportProgress: true, observe: 'events', headers: { 'No-Content-Type': '' } }
      )
      
  }

  getRandomImage(): Observable<IImageGroup> {
    return this.http
      .get<IImageGroup>(
        '/api/photo/random'
      )

  }
}
