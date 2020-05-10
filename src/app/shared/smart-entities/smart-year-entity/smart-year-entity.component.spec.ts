import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartYearEntityComponent } from './smart-year-entity.component';

describe('SmartYearEntityComponent', () => {
  let component: SmartYearEntityComponent;
  let fixture: ComponentFixture<SmartYearEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartYearEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartYearEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
