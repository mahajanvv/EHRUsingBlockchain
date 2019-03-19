import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { DoctorID, DoctorProfile, Address } from '../../../interfaces/doctor';
@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {



  private doctorslist : DoctorProfile[];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getAllDoctorProfile().subscribe(data =>{
      this.doctorslist = data;
      console.log(this.doctorslist);
    },error => {console.log(error)});
  }

}
