import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { doctorID } from '../interfaces/doctor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _url : string = "http://localhost:3000/api/Doctor";

  constructor(private http: HttpClient) { }

  getAllDoctorIDs(): Observable<doctorID[]>{
    return this.http.get<doctorID[]>(this._url);
  }
}
