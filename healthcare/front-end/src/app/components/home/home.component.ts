import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _doctorservice : DoctorService) { }

  ngOnInit() {
    this._doctorservice.getAllDoctorIDs().subscribe(data => console.log(data));
  }

}
