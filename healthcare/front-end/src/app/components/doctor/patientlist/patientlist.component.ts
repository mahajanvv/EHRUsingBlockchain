import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {

  private patientslist : Patient[];

  constructor(private _patientService: PatientService) { }

  ngOnInit() {
    this._patientService.getAllPatients().subscribe(data=>{
      this.patientslist = data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }

}
