import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.component.html',
  styleUrls: ['./doctorprofile.component.css']
})
export class DoctorprofileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showFiller = false;
  toggle = true;
  ontoggle(drawer){
    this.toggle = !this.toggle;
    drawer.toggle();
  }

}
