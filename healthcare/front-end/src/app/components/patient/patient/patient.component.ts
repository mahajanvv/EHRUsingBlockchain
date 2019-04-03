import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private _patientService: PatientService) { 
  }
  ngOnInit(){
    this._patientService.setUserName("Pat1");
  }

  ontoggle(drawer){
    drawer.toggle();
  }
}
