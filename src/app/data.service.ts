import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoalsApi } from './goalsApi';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private goals = new BehaviorSubject<any>([]);
  goal = this.goals.asObservable();

  constructor(private http: HttpClient) { }

  apiURL = 'http://34.125.7.41:8101/music-api';

  changeGoal(goal: any){
    this.goals.next(goal);
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods':'GET' 
      })
  } 

  getGoals(): Observable<GoalsApi>{
    return this.http.get<GoalsApi>(this.apiURL + '/album', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  newGoal(payload: any): Observable<GoalsApi> {
    return this.http.post<GoalsApi>(this.apiURL + '/album', JSON.stringify(payload), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
