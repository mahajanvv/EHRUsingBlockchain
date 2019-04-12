import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, 
 MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule,
 MatSnackBarModule, MatDialogModule } from '@angular/material';
 import { DialogAddNewPatient } from '../components/doctor/patientlist/patientlist.component';

@NgModule({
  imports: [CommonModule, MatButtonModule,MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, 
  MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, MatSnackBarModule, MatDialogModule],
  declarations:[DialogAddNewPatient],
  entryComponents:[DialogAddNewPatient],
  exports: [CommonModule, MatButtonModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, 
  MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, MatSnackBarModule, MatDialogModule]

})
export class CustomMaterialModule { }