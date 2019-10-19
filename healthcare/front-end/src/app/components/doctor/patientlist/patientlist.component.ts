import { Component, OnInit, Inject } from '@angular/core';
import { Patient } from 'src/app/interfaces/patient';
import { CommonserviceService } from '../../../services/commonservice.service';
import { DoctorService } from '../../../services/doctor.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router } from '@angular/router';

export interface addMedicalRecord {
  $class : string,
  patient: string,
  doctor: string,
  description: string,
  prescription: string,
  encounter_time: string
}

@Component({
  selector: 'addNewPatient',
  templateUrl: 'addNewPatient.html',
})
export class DialogAddNewPatient {

  constructor(
    public dialogRef: MatDialogRef<DialogAddNewPatient>,
    @Inject(MAT_DIALOG_DATA) public data: addMedicalRecord, 
    private _doctorService: DoctorService) {}

    onCancelClicked(): void {
    this.dialogRef.close();
  }

  onSubmit(description: string, prescription:string){
    this.data.description = description;
    this.data.prescription = prescription;
    this.data.encounter_time = new Date().toString();
    this._doctorService.addNewMedicalRecord(this.data).
    subscribe(data =>{
      console.log(data);
    }, error=>{
      console.log(error);
    });
  }

}

@Component({
  selector: 'app-patientlist',
  templateUrl: './patientlist.component.html',
  styleUrls: ['./patientlist.component.css']
})
export class PatientlistComponent implements OnInit {
  private patientslist : Patient[];

  constructor(private _commonService: CommonserviceService, 
    private _doctorService: DoctorService, public dialog : MatDialog, 
     private _router: Router) { }

  ngOnInit() {
    console.log(this._doctorService.getUserName())
    this._commonService.getPatientsByDoctorId(this._doctorService.getUserName())
    .subscribe(data => {
      this.patientslist = data;
      console.log(this.patientslist);
    }, error =>{
      console.log(error);
    });
  }

  
  openDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(DialogAddNewPatient, {
      width: '50%',
      data: {$class: "org.example.healthcare.AddnewMedicalRecord",
             patient: patient.UserId,
             doctor: this._doctorService.getUserName()}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  ViewMedicalRecords(id : string){
    console.log(id);
    this._doctorService.setPatientId(id);
    this._router.navigateByUrl('/doctor/medicalrecords');
  }
}
