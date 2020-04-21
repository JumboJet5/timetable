import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseThemesComponent } from './course-themes.component';

describe('CourseThemesComponent', () => {
  let component: CourseThemesComponent;
  let fixture: ComponentFixture<CourseThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
