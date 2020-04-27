import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartCourseEntityComponent } from './smart-course-entity.component';

describe('SmartCourseEntityComponent', () => {
  let component: SmartCourseEntityComponent;
  let fixture: ComponentFixture<SmartCourseEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartCourseEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartCourseEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
