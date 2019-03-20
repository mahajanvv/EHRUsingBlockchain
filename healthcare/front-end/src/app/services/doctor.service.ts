import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { doctorID, DoctorProfile, Address } from '../interfaces/doctor';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorIDURL : string = "http://localhost:3000/api/Doctor";
  private doctorProfileURL : string = "http://localhost:3000/api/Doctor_profile";
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

  getAllDoctorIDs(): Observable<doctorID[]>{
    return this.http.get<doctorID[]>(this.doctorIDURL).pipe(
      catchError(this.errorHandler)
    );
  }
  getAllDoctorProfile(): Observable<DoctorProfile[]>{
    return this.http.get<DoctorProfile[]>(this.doctorProfileURL,{params:new HttpParams().set('filter',JSON.stringify({include:'resolve'}))})
    .pipe(catchError(this.errorHandler));
  }
  getDoctorProfileByID(id : string):Observable<DoctorProfile>{
    return this.http.get<DoctorProfile>(this.doctorProfileURL+"/"+id, 
    {params:new HttpParams().set('filter',JSON.stringify({include:'resolve'}))})
    .pipe(catchError(this.errorHandler));
  }

  addnewDoctor(DoctorID : doctorID): Observable<doctorID>{
      
      return this.http.post<doctorID>(this.doctorIDURL, DoctorID, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  updateDoctorProfile(id : string, doctorprofile: any):Observable<DoctorProfile>{
    console.log(doctorprofile);
    return this.http.put<DoctorProfile>(this.doctorProfileURL+"/"+id,doctorprofile,
    this.httpOptions).pipe(catchError(this.errorHandler));
  }

  addnewDoctorProfile(doctorprofile : any): Observable<DoctorProfile>{
    return this.http.post<DoctorProfile>(this.doctorProfileURL, doctorprofile, this.httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
