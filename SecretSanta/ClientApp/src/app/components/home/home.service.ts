import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, map } from 'rxjs/operators';

const headers = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) { }

  addPerson(user: add): Observable<any> {
    let addperson = "api/SecretSanta/addperson";
    return this.http
      .post<any>(addperson, user, headers)
      .pipe(
        tap(res => console.log(`add success`, res)),
        catchError(this.handleError())
      );
  }

  deletePerson(email: string): Observable<any> {

    let url = 'api/SecretSanta/deletePerson?email=' + email;

    return this.http
      .get<any>(url)
      .pipe(
        tap(heroes => console.log(`success`, heroes)),
        catchError(this.handleError('user', []))
      );
  }

  getPersons(): Observable<any> {

    let allpersons = 'api/SecretSanta/getallpersons';

    return this.http
      .get<any>(allpersons)
      .pipe(
        tap(heroes => console.log(`alluser success`, heroes)),
        catchError(this.handleError('user', []))
      );
  }

  getGroups(): Observable<any> {

    let url = 'api/SecretSanta/getallgroups';

    return this.http
      .get<any>(url)
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

//models

export class add {
  firstname: string;
  lastname: string;
  email: string;
  group: string;
}
