import { Observable, of, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";

export abstract class BaseService {

  constructor() { }

  protected handleServiceError<T>(operation = 'operation', result?: T, throwError: boolean = false) {
    return (error: any): Observable<T> => {
      console.error(error);
      if (throwError) {
        throw (error);
      } else {
        return of(result as T);
      }
    }
  }

  getHttpHeaders(authorizationToken: string = null) : HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (authorizationToken) {
      headers = headers.append('Authorization', `Bearer  ${authorizationToken}`)
    }
    return headers;
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error}`;
    }
    return throwError(errorMessage);
  }
}
