import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DoctorID, DoctorProfileClass, AddressClass, doctorID, Address} from '../../../interfaces/doctor';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {
  private username : string = "Vinit Mahajan";
  
  private doctorid : DoctorID;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    EmailAddress: new FormControl(''),
    Dob: new FormControl(''),
    Qualifications: new FormControl(''),
    address: new FormGroup({
      number: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      PinCode: new FormControl('')
    })
  });

  constructor() { 
  }
  
  ngOnInit() {
    this.profileForm.patchValue({firstName:"Wayne", lastName : "Mahajan"});
  }
  ontoggle(drawer){
    drawer.toggle();
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }
}