import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalrecordsComponent } from './medicalrecords.component';

describe('MedicalrecordsComponent', () => {
  let component: MedicalrecordsComponent;
  let fixture: ComponentFixture<MedicalrecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalrecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalrecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
