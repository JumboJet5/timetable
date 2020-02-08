import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTimeSelectComponent } from './lesson-time-select.component';

describe('LessonTimeSelectComponent', () => {
  let component: LessonTimeSelectComponent;
  let fixture: ComponentFixture<LessonTimeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTimeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTimeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
