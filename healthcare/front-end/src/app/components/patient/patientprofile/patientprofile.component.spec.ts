import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientprofileComponent } from './patientprofile.component';

describe('PatientprofileComponent', () => {
  let component: PatientprofileComponent;
  let fixture: ComponentFixture<PatientprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
