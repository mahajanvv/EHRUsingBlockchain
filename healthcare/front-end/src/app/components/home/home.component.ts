import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service'
import { DoctorID } from '../../interfaces/doctor';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _doctorservice : DoctorService) { }

  ngOnInit() {
    this._doctorservice.getAllDoctorIDs().subscribe(data => console.log(data));
    //this._doctorservice.getDoctorProfileByID("Kapil Bhalotia").subscribe(data=> console.log(data));
    //this._doctorservice.addnewDoctor(new DoctorID("Vinit"))
    //.subscribe(data => console.log(data));

  }
  OpenLogin(){
    
  }

}
