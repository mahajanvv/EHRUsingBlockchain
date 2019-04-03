import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, 
 MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule,
 MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule,MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, 
  MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, MatSnackBarModule],
  exports: [CommonModule, MatButtonModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, 
  MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, MatSnackBarModule]
})
export class CustomMaterialModule { }