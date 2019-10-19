import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MydoctorsComponent } from './mydoctors.component';

describe('MydoctorsComponent', () => {
  let component: MydoctorsComponent;
  let fixture: ComponentFixture<MydoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MydoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MydoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
