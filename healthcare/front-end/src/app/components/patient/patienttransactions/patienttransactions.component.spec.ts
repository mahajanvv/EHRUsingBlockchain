import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienttransactionsComponent } from './patienttransactions.component';

describe('PatienttransactionsComponent', () => {
  let component: PatienttransactionsComponent;
  let fixture: ComponentFixture<PatienttransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienttransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienttransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
