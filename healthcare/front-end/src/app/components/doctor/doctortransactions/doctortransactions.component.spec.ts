import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctortransactionsComponent } from './doctortransactions.component';

describe('DoctortransactionsComponent', () => {
  let component: DoctortransactionsComponent;
  let fixture: ComponentFixture<DoctortransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctortransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctortransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
