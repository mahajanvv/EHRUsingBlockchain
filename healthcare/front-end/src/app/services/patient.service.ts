import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { PatientClass, PatientProfileClass, Patient, PatientProfile } from '../interfaces/patient';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private username : string = "Sundar Pichai";

  private patientURL = "http://localhost:3000/api/Patient";
  private patientProfileURL = "http://localhost:3000/api/Patient_profile";

  private HttpOptions  = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  setUserName(name: string){
    this.username = name;
  }

  getUserName(){
    return this.username;
  }

  getAllPatients(): Observable <Patient[]>{
    return this.http.get<Patient[]>(this.patientURL);
  }
  getAllPatientsProfile(): Observable<PatientProfile[]>{
    return this.http.get<PatientProfile[]>(this.patientProfileURL, {params: new HttpParams().set('filter',JSON.stringify({include:'resolve'}))});
  }

  getPatientProfileByID(id:string): Observable<PatientProfile>{
    return this.http.get<PatientProfile>(this.patientProfileURL+"/"+id, {
      params : new HttpParams().set('filter', JSON.stringify({include : 'resolve'}))
    });
  }

  AddPatient(patient : Patient) : Observable<Patient>{
    return this.http.post<Patient>(this.patientURL, patient).pipe(
      catchError(this.errorHandler)
    );
  }
  AddPatientProfile(patientprofile: PatientProfileClass) : Observable<PatientProfile>{
    return this.http.post<PatientProfile>(this.patientProfileURL,patientprofile, this.HttpOptions)
    .pipe(catchError(this.errorHandler));
  }

  UpdatePatient(patientID : string, patient: PatientClass){
    return this.http.put(this.patientURL+"/"+patientID, patient, this.HttpOptions)
    .pipe(catchError(this.errorHandler));
  }

  UpdatePatientProfile(patientID : string,patientprofile : PatientProfileClass){
    return this.http.put(this.patientProfileURL+"/"+patientID, patientprofile, 
    this.HttpOptions)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error.message || "Server Error");
  }
}
