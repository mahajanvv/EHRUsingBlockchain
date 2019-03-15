import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DoctorprofileComponent } from './components/doctor/doctorprofile/doctorprofile.component';
import { PatientprofileComponent } from './components/patient/patientprofile/patientprofile.component';
import { DoctorComponent } from './components/doctor/doctor/doctor.component';
import { PatientComponent } from './components/patient/patient/patient.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path : '', component:HomeComponent},
  { path : 'doctor', component : DoctorComponent,
  children : [
    { path : '', redirectTo : '/doctor/profile', pathMatch : 'full' },
    { path : 'profile', component:DoctorprofileComponent }
  ]},
  { path : 'patient', component : PatientComponent,
  children : [
    { path: '', redirectTo :'/patient/profile', pathMatch : 'full'},
    {path: 'profile', component : PatientprofileComponent}
  ]},
  { path : '**', component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, DoctorprofileComponent, PatientprofileComponent, 
DoctorComponent, PatientComponent, PagenotfoundComponent]