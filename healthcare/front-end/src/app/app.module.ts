import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReadonlyEHRComponent } from './components/doctor/readonly-ehr/readonly-ehr.component';
import { PatientMedicalRecordsComponent } from './components/patient/patient-medical-records/patient-medical-records.component';
import { MydoctorsComponent } from './components/patient/mydoctors/mydoctors.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ReadonlyEHRComponent,
    PatientMedicalRecordsComponent,
    MydoctorsComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
