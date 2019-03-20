import { Component, OnInit } from '@angular/core';
import { PatientClass, PatientProfile } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  private patientslist : PatientProfile[];

  constructor(private _patientService: PatientService) { }

  ngOnInit() {
    this._patientService.getAllPatientsProfile().subscribe(
      data => {this.patientslist  = data;
      console.log(this.patientslist);
    },
      error => {console.log(error);}
    ); 
  }

}
