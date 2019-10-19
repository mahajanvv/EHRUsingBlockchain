import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  constructor(private doctorService: DoctorService) { 
     this.doctorService.setUserName("Doc1");
   }

  ngOnInit() {
  }
  
  ontoggle(drawer){
   
    drawer.toggle();
  }

}
