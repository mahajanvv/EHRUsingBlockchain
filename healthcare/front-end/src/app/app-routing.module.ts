import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DoctorprofileComponent } from './components/doctor/doctorprofile/doctorprofile.component';
import { PatientprofileComponent } from './components/patient/patientprofile/patientprofile.component';
import { DoctorComponent } from './components/doctor/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient/patient.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DoctorlistComponent } from './components/doctor/doctorlist/doctorlist.component';
import { PatientlistComponent } from './components/doctor/patientlist/patientlist.component';
import { MedicalrecordsComponent } from './components/doctor/medicalrecords/medicalrecords.component';
import { AlltransactionsComponent } from './components/alltransactions/alltransactions.component';
import { DoctortransactionsComponent } from './components/doctor/doctortransactions/doctortransactions.component';
import { ReadonlyEHRComponent } from './components/doctor/readonly-ehr/readonly-ehr.component';
import { PatientMedicalRecordsComponent } from './components/patient/patient-medical-records/patient-medical-records.component';

const routes: Routes = [
  { path : '', component:HomeComponent},
  { path : 'doctor', component : DoctorComponent,
  children : [
    { path : '', redirectTo : '/doctor/profile', pathMatch : 'full' },
    { path : 'profile', component:DoctorprofileComponent },
    { path : 'patientlist', component:PatientlistComponent },
    { path : 'doctorlist', component : DoctorlistComponent},
    { path : 'medicalrecords', component : MedicalrecordsComponent},
    { path : 'alltransactions', component : AlltransactionsComponent },
    { path : 'doctortransactions', component : DoctortransactionsComponent},
    { path : 'readonlymedicalrecords', component : ReadonlyEHRComponent}
  ]},
  { path : 'patient', component : PatientComponent,
  children : [
    { path: '', redirectTo :'/patient/profile', pathMatch : 'full'},
    { path: 'profile', component : PatientprofileComponent},
    { path: 'alltransactions', component: AlltransactionsComponent},
    { path: 'medicalrecords', component : PatientMedicalRecordsComponent}
  ]},
  { path : '**', component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, DoctorprofileComponent, PatientprofileComponent, 
DoctorComponent, PatientComponent, PagenotfoundComponent, MedicalrecordsComponent, PatientlistComponent
, DoctorlistComponent, AlltransactionsComponent, DoctortransactionsComponent];