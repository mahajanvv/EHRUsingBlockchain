import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Doctor, DoctorClass, AddressClass} from '../../../interfaces/doctor';
import { DoctorService } from '../../../services/doctor.service';
import { MatSnackBar } from '@angular/material';
import { config } from 'rxjs';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {  
  private doctorProfile : Doctor;

  qualificationsList : string [] = ['Doctor of Medicine by research (MD(Res), DM)',
'Doctor of Philosophy (PhD, DPhil)', 'Master of Clinical Medicine (MCM)',
'Master of Medical Science (MMSc, MMedSc)', 'Master of Medicine (MM, MMed)',
'Master of Philosophy (MPhil)', 'Master of Surgery (MS, MSurg, MChir, MCh, ChM, CM)',
'Master of Science in Medicine or Surgery (MSc)', 'Doctor of Clinical Medicine (DCM)',
'Doctor of Clinical Surgery (DClinSurg)', 'Doctor of Medical Science (DMSc, DMedSc)', 
'Doctor of Surgery (DS, DSurg)'];

  

  profileForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
    EmailAddress: new FormControl(''),
    Phone: new FormControl(''),
    Qualifications : new FormControl(),
    Dob: new FormControl(''),
    address: new FormGroup({
      number: new FormControl(),
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl('')
    })
  });

  constructor(private doctorService : DoctorService, private snackBar: MatSnackBar) {
    
  }
  
  ngOnInit() {
    this.doctorService.getDoctorByID(this.doctorService.getUserName()).subscribe(
      data => {
        this.profileForm.patchValue(data);
        this.doctorProfile = data;
        if(this.doctorProfile.ImageURL==""){
          this.doctorProfile.ImageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBshi_KRgxaUnlwmEFklw7Jyox0vqpbcOiqldGpK6qqQ96rHxY";
        }
        console.log(this.doctorProfile);
      }, error =>{
        console.log(error);
        this.snackBar.open("Error Occured", "close",{
          duration : 5000,
        })
      });
    /*this.profileForm.patchValue({firstName:"Wayne", lastName : "Mahajan",
   Qualifications: ['Doctor of Medicine by research (MD(Res), DM)',
   'Doctor of Philosophy (PhD, DPhil)', 'Master of Clinical Medicine (MCM)']});*/
    //console.log(this.profileForm.value['Qualifications']) ;
    
  }
  ontoggle(drawer){
    drawer.toggle();
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    
    this.doctorService.updateDoctor(this.doctorProfile.UserId, 
      new DoctorClass(this.doctorProfile.UserId, this.profileForm.get('FirstName').value, 
      this.profileForm.get('LastName').value, this.profileForm.get('EmailAddress').value, 
      this.profileForm.get('Phone').value, this.profileForm.get('Dob').value, 
      ""+this.doctorProfile.ImageURL.toString(), 
      new AddressClass(this.profileForm.get('address.number').value,this.profileForm.get('address.street').value,
    this.profileForm.get('address.city').value,this.profileForm.get('address.country').value,
    this.profileForm.get('address.pincode').value),
    this.profileForm.get('Qualifications').value))
    .subscribe(data => {
      this.profileForm.patchValue(data);
      this.doctorProfile = data;
      console.log(this.doctorProfile);
      this.snackBar.open("Profile Updated Successfully", "close", {
        duration : 5000,
      });
    }, error=>{
      console.log(error);
      this.snackBar.open("Failed to update the profile", "close", {
        duration : 5000,
      });
    });
  }
}