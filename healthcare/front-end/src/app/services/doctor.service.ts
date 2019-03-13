import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { doctorID, DoctorProfile, Address } from '../interfaces/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private doctorIDURL : string = "http://localhost:3000/api/Doctor";
  private doctorProfileURL : string = "http://localhost:3000/api/Doctor_profile"

  constructor(private http: HttpClient) { }

  getAllDoctorIDs(): Observable<doctorID[]>{
    return this.http.get<doctorID[]>(this.doctorIDURL);
  }
  getAllDoctorProfile(): Observable<DoctorProfile[]>{
    return this.http.get<DoctorProfile[]>(this.doctorProfileURL,{params:new HttpParams().set('filter',JSON.stringify({include:'resolve'}))});
  }
  getDoctorProfileByID(id : string):Observable<DoctorProfile>{
    return this.http.get<DoctorProfile>(this.doctorProfileURL+"/"+id, 
    {params:new HttpParams().set('filter',JSON.stringify({include:'resolve'}))});
  }
}
