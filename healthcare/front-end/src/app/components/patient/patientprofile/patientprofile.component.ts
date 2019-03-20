import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientProfile } from '../../../interfaces/patient';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-patientprofile',
  templateUrl: './patientprofile.component.html',
  styleUrls: ['./patientprofile.component.css']
})
export class PatientprofileComponent implements OnInit {

  private patientprofile : PatientProfile;

  private Genders : string [] = ["Male","Female","Other"];

  profileForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    EmailAddress : new FormControl(''),
    Dob : new FormControl(''),
    Patient : new FormGroup({
      gender : new FormControl(''),
      age : new FormControl('')
    }),
    address : new FormGroup({
      number : new FormControl(''),
      street : new FormControl(''),
      city : new FormControl(''),
      country : new FormControl(''),
      PinCode : new FormControl('')
    })
  });

  constructor( private _patientService : PatientService) { }

  ngOnInit() {

    this._patientService.getPatientProfileByID(this._patientService.getUserName()).subscribe(data => {
      this.profileForm.patchValue(data);
      this.patientprofile = data;
      console.log(this.patientprofile);
    },
    error => {
      console.log(error);
    });
  }


}
