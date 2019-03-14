import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  
  ontoggle(drawer){
   
    drawer.toggle();
  }

}
