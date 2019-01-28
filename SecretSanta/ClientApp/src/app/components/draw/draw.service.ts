import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DrawService {

  constructor(private http: HttpClient) { }



  draw(): Observable<any> {

    let allpersons = 'api/SecretSanta/getsantas';

    return this.http
      .get<any>(allpersons)
      .pipe(
        tap(heroes => console.log(`success`, heroes)),
        catchError(this.handleError('user', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      throw error;
    };
  }
}
