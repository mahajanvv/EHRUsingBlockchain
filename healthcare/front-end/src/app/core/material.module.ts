import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, 
 MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule,
 } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule,MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, 
  MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule],
  exports: [CommonModule, MatButtonModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatCardModule, 
  MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule]
})
export class CustomMaterialModule { }