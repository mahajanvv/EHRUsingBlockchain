import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  historianURL : string = "http://localhost:3000/api/system/historian";
  constructor(private http : HttpClient) { }

  getHistoricalTransactions() : Observable <any>{
    return this.http.get<any>(this.historianURL).pipe(
      catchError(this.ErrorHandler)
    );
  }

  ErrorHandler(error : HttpErrorResponse){
    return throwError(error.message || "server error");
  }
}
