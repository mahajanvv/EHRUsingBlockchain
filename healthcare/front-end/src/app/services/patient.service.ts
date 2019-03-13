import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { filterQueryId } from '@angular/core/src/view/util';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientURL = "";

  constructor(private http: HttpClient) { }

  getAllPatients(){
    return this.http.get(this.patientURL);
  }
  getAllPatientsProfile(){
    return this.http.get(this.patientURL, {params: new HttpParams().set('filter',JSON.stringify({include:'resolve'}))});
  }
}
