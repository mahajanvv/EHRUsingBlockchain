import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PatientProfile, PatientProfileClass, AddressClass, PatientClass } from '../../../interfaces/patient';
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

  onSubmit(){
    this._patientService.UpdatePatientProfile(this.patientprofile.profile_id, 
      new PatientProfileClass(this.patientprofile.profile_id,
         "resource:org.example.healthcare.Patient#"+this.patientprofile.profile_id,
      this.profileForm.get('firstName').value,this.profileForm.get('lastName').value,
      this.profileForm.get('EmailAddress').value, 
      +this.profileForm.get('Dob').value, new AddressClass(
        this.profileForm.get('address.number').value, this.profileForm.get('address.street').value,
        this.profileForm.get('address.city').value, this.profileForm.get('address.country').value
        , this.profileForm.get('address.PinCode').value
      ))).subscribe(
        data =>{
          console.log(data);
          this._patientService.UpdatePatient(this.patientprofile.profile_id, new PatientClass(
            this.patientprofile.profile_id, this.patientprofile.Patient.authorized, 
            this.profileForm.get('Patient.gender').value, this.profileForm.get('Patient.age').value
          )).subscribe(data => {
            console.log(data);
            this._patientService.getPatientProfileByID(this._patientService.getUserName()).subscribe(data => {
              this.profileForm.patchValue(data);
              this.patientprofile = data;
              console.log(this.patientprofile);
            },
            error => {
              console.log(error);
            });
          },
          error => {
            console.log(error);
          })
        },
        error=>{
          console.log(error);
        }
      )
  }

}
