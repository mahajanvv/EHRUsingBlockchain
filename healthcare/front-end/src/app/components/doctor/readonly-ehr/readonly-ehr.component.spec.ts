import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadonlyEHRComponent } from './readonly-ehr.component';

describe('ReadonlyEHRComponent', () => {
  let component: ReadonlyEHRComponent;
  let fixture: ComponentFixture<ReadonlyEHRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadonlyEHRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadonlyEHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
