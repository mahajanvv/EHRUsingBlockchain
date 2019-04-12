import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { MedicalRecord } from 'src/app/interfaces/medical';
@Component({
  selector: 'app-readonly-ehr',
  templateUrl: './readonly-ehr.component.html',
  styleUrls: ['./readonly-ehr.component.css']
})
export class ReadonlyEHRComponent implements OnInit {

  private medicalRecords : MedicalRecord[];

  constructor( private _doctorService : DoctorService ) { }

  ngOnInit() {
    this._doctorService.getReadOnlyMedicalRecords().subscribe(
      data =>{
        this.medicalRecords = data;
        console.log(this.medicalRecords);
      },error => {
        console.log(error);
      });
  }

}
