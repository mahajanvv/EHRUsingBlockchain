import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from '../../../services/commonservice.service';
import { DoctorService } from '../../../services/doctor.service';
import { MedicalRecord } from 'src/app/interfaces/medical';
@Component({
  selector: 'app-medicalrecords',
  templateUrl: './medicalrecords.component.html',
  styleUrls: ['./medicalrecords.component.css']
})
export class MedicalrecordsComponent implements OnInit {

  private medicalRecords : MedicalRecord[];

  constructor(private _commonService: CommonserviceService, 
    private _doctorService: DoctorService) { }

  ngOnInit() {
    console.log(this._doctorService.getPatientId());

    if(this._doctorService.getPatientId()!= null){
      this._commonService.getMedicalRecordsByDoctorAndPatientIds(
        this._doctorService.getUserName(), this._doctorService.getPatientId()).subscribe(data=>{
          this.medicalRecords = data;
          console.log(this.medicalRecords);
        }, error=>{
          console.log(error);
      });  
    }
  }

  isPatientAvailable(){
    return this._doctorService.getPatientId()!=null
  }

  fetchrecords(patname : string){
    if(patname == ""){
      return ;
    }
    this._doctorService.setPatientId(patname);
    this._commonService.getMedicalRecordsByDoctorAndPatientIds(
      this._doctorService.getUserName(), patname).subscribe(data=>{
        this.medicalRecords = data;
        console.log(this.medicalRecords);
      }, error=>{
        console.log(error);
      });
  }

  AddOtherDoctorToRead(id : string, record_id: string){
    if(id == "" || record_id == ""){
      return;
    }
    const record : AllowOthersTransaction  = {
      $class : "org.example.healthcare.AllowOthersToRead",
      UserId : id,
      medicalRecord : "resource:org.example.healthcare.MedicalRecord#"+record_id
    }
    this._doctorService.allowOthersToRead(record).subscribe(data=>{
      this.fetchrecords(this._doctorService.getPatientId());
      console.log(data);
    }, error=>{
      console.log(error);
    });
  }
  RemoveDoctorToRead(id: string, record_id: string){
    if(id == "" || record_id == ""){
      return ;
    }
    const record : AllowOthersTransaction = {
      $class: "org.example.healthcare.RemoveOthersToRead",
      UserId: id,
      medicalRecord: "resource:org.example.healthcare.MedicalRecord#"+record_id
    }
    this._doctorService.removeFromReadersList(record).subscribe(data=>{
      this.fetchrecords(this._doctorService.getPatientId());
      console.log(data);
    }, error =>{
      console.log(error);
    });
  }

}

export interface AllowOthersTransaction{
  $class:string,
  UserId: string,
  medicalRecord:string
}