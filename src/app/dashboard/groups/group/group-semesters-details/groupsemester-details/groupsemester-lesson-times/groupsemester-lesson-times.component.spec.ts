import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsemesterLessonTimesComponent } from './groupsemester-lesson-times.component';

describe('GroupsemesterLessonTimesComponent', () => {
  let component: GroupsemesterLessonTimesComponent;
  let fixture: ComponentFixture<GroupsemesterLessonTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsemesterLessonTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsemesterLessonTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
