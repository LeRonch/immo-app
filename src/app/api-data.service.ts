import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from './interfaces/property';

@Injectable({
  providedIn: 'root'
})

export class ApiDataService {

  private restApi = 'http://127.0.0.1:8000/api/property';
  private url: string;

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(): Observable<Property[]>{
    this.url = `${this.restApi}/all`;
    return this.http.get<Property[]>(this.url).pipe(retry(1), catchError(this.handleError));
  }

  public sendGetRequestById(id: string): Observable<Property>{
    this.url = `${this.restApi}/detail/${id}`;
    return this.http.get<Property>(this.url).pipe(retry(1), catchError(this.handleError));
  }

  public postRequest(propertyInterface: Property): Observable<Property>{
    this.url = `${this.restApi}/post`;
    return this.http.post<Property>(this.url, propertyInterface).pipe(retry(1), catchError(this.handleError));
  }

  public deleteRequest(id: string): Observable<Property> {
    this.url = `${this.restApi}/delete/${id}`;
    return this.http.delete<Property>(this.url).pipe(retry(1), catchError(this.handleError));
  }

}
