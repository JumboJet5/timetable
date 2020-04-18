import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonFormatSelectComponent } from './lesson-format-select.component';

describe('LessonFormatSelectComponent', () => {
  let component: LessonFormatSelectComponent;
  let fixture: ComponentFixture<LessonFormatSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonFormatSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonFormatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
