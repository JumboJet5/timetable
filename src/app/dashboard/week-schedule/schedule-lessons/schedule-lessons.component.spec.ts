import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLessonsComponent } from 'src/app/dashboard/week-schedule/schedule-lessons/schedule-lessons.component';

describe('ScheduleLessonsComponent', () => {
  let component: ScheduleLessonsComponent;
  let fixture: ComponentFixture<ScheduleLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
