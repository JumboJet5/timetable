import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEntityComponent } from './course-entity.component';

describe('CourseEntityComponent', () => {
  let component: CourseEntityComponent;
  let fixture: ComponentFixture<CourseEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
