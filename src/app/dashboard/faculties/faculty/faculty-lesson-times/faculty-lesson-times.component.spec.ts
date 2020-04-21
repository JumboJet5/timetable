import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyLessonTimesComponent } from 'src/app/dashboard/faculties/faculty/faculty-lesson-times/faculty-lesson-times.component';

describe('FacultyLessontimesComponent', () => {
  let component: FacultyLessonTimesComponent;
  let fixture: ComponentFixture<FacultyLessonTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyLessonTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyLessonTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
