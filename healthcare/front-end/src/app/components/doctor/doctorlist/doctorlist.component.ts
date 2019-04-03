import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor, Address } from '../../../interfaces/doctor';
@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {



  private doctorslist : Doctor[];

  constructor(private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe(
      data => {
        this.doctorslist = data;
        console.log(this.doctorslist);
      },
      error => {
        console.log(error);
      });
  }

}
