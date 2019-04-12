import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { MedicalRecord } from 'src/app/interfaces/medical';
@Component({
  selector: 'app-patient-medical-records',
  templateUrl: './patient-medical-records.component.html',
  styleUrls: ['./patient-medical-records.component.css']
})
export class PatientMedicalRecordsComponent implements OnInit {

  private medicalRecords : MedicalRecord[];

  constructor( private _patientService: PatientService) { }

  ngOnInit() {
    this._patientService.getAllMedicalRecords().subscribe(data=>{
      this.medicalRecords = data;
      console.log(this.medicalRecords);
    }, error=>{
      console.log(error);
    });
  }

}
