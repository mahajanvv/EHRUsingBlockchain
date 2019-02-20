/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { Patient_profileComponent } from './Patient_profile/Patient_profile.component';
import { Doctor_profileComponent } from './Doctor_profile/Doctor_profile.component';
import { PatientComponent } from './Patient/Patient.component';
import { Medical_RecordComponent } from './Medical_Record/Medical_Record.component';

import { DoctorComponent } from './Doctor/Doctor.component';

import { UpdateRecordComponent } from './UpdateRecord/UpdateRecord.component';
import { AllowOtherDoctorsReadComponent } from './AllowOtherDoctorsRead/AllowOtherDoctorsRead.component';
import { AllowAdoctorWriteComponent } from './AllowAdoctorWrite/AllowAdoctorWrite.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Patient_profile', component: Patient_profileComponent },
  { path: 'Doctor_profile', component: Doctor_profileComponent },
  { path: 'Patient', component: PatientComponent },
  { path: 'Medical_Record', component: Medical_RecordComponent },
  { path: 'Doctor', component: DoctorComponent },
  { path: 'UpdateRecord', component: UpdateRecordComponent },
  { path: 'AllowOtherDoctorsRead', component: AllowOtherDoctorsReadComponent },
  { path: 'AllowAdoctorWrite', component: AllowAdoctorWriteComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
