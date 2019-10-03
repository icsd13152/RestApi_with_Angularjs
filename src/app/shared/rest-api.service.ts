import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Employee} from '../shared/employee';
import {Observable,throwError} from 'rxjs';
import {retry,catchError} from 'rxjs/operators';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  //define API
  apiURL = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  //CRUD

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  //get method
  getEmployees(): Observable<Employee>{
    return this.http.get<Employee>(this.apiURL+'/employees').pipe(retry(1),catchError(this.handleError))
  }

  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employees/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  } 

  //post method
  createEmployee(employee):Observable<Employee>{
    return this.http.post<Employee>(this.apiURL+'/employees',JSON.stringify(employee),this.httpOptions).pipe(retry(1),catchError(this.handleError))
  }

  //put method
  updateEmployee(id,employee):Observable<Employee>{
    return this.http.put<Employee>(this.apiURL+'/employees/'+id, JSON.stringify(employee),this.httpOptions).pipe(retry(1),catchError(this.handleError))
  }

  //delete method
  deleteEmployee(id){
    return this.http.delete<Employee>(this.apiURL+'/employees/'+id,this.httpOptions).pipe(retry(1),catchError(this.handleError))
  }


  //error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      //client-side error
      errorMessage = error.error.message;

    }else{
      //Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
