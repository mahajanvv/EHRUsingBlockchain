import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalRecordsComponent } from './patient-medical-records.component';

describe('PatientMedicalRecordsComponent', () => {
  let component: PatientMedicalRecordsComponent;
  let fixture: ComponentFixture<PatientMedicalRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMedicalRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMedicalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
