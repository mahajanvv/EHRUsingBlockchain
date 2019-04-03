import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Doctor, DoctorClass ,Address } from '../interfaces/doctor';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorURL : string = "http://localhost:3000/api/Doctor";
  private username : string;

  private httpOptions = {
    headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };

  constructor(private http: HttpClient) { }

  setUserName(name : string){
    this.username = name;
  }

  getUserName(){
    return this.username;
  }

  getAllDoctors(): Observable<Doctor[]>{
    return this.http.get<Doctor[]>(this.doctorURL).pipe(
      catchError(this.errorHandler)
    );
  }

  getDoctorByID(id : string):Observable<Doctor>{
    return this.http.get<Doctor>(this.doctorURL+"/"+id, 
    {params:new HttpParams().set('filter',JSON.stringify({include:'resolve'}))})
    .pipe(catchError(this.errorHandler));
  }

  addnewDoctor(doctor : Doctor): Observable<Doctor>{
    return this.http.post<Doctor>(this.doctorURL, doctor, this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  updateDoctor(id : string, doctorprofile: any):Observable<Doctor>{
    console.log(doctorprofile);
    return this.http.put<Doctor>(this.doctorURL+"/"+id,doctorprofile,
    this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
