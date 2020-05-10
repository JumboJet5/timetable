import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartPeriodEntityComponent } from './smart-period-entity.component';

describe('SmartPeriodEntityComponent', () => {
  let component: SmartPeriodEntityComponent;
  let fixture: ComponentFixture<SmartPeriodEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartPeriodEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartPeriodEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
