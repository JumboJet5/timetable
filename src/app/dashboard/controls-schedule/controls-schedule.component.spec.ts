import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsScheduleComponent } from './controls-schedule.component';

describe('ControlsScheduleComponent', () => {
  let component: ControlsScheduleComponent;
  let fixture: ComponentFixture<ControlsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
