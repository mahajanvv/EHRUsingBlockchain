import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Patient } from '../interfaces/patient';
import { MedicalRecord } from '../interfaces/medical';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  queriesURL : string = "http://localhost:3000/api/queries";
  historianURL : string = "http://localhost:3000/api/system/historian";
  constructor(private http : HttpClient) { }

  getHistoricalTransactions() : Observable <any>{
    return this.http.get<any>(this.historianURL).pipe(
      catchError(this.ErrorHandler)
    );
  }

  getPatientsByDoctorId(id : string): Observable<Patient[]>{
    return this.http.get<Patient[]>(this.queriesURL+"/selectPatientByDoctorId?DoctorId="+id)
    .pipe(catchError(this.ErrorHandler))
  }

  getMedicalRecordsByDoctorAndPatientIds(doctorId: string, patientId: string): Observable<MedicalRecord[]>{
    return this.http.get<MedicalRecord[]>("http://localhost:3000/api/queries/selectMedicalRecordByDoctorAndPatientId?DoctorId="+
    doctorId+"&PatientId="+patientId).
    pipe(catchError(this.ErrorHandler));
  }

  ErrorHandler(error : HttpErrorResponse){
    return throwError(error.message || "server error");
  }
}
