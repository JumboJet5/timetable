import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodTypesSelectComponent } from './period-types-select.component';

describe('PeriodTypesSelectComponent', () => {
  let component: PeriodTypesSelectComponent;
  let fixture: ComponentFixture<PeriodTypesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodTypesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodTypesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
