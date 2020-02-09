import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonWeeksSelectorComponent } from './lesson-weeks-selector.component';

describe('LessonWeeksSelectorComponent', () => {
  let component: LessonWeeksSelectorComponent;
  let fixture: ComponentFixture<LessonWeeksSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonWeeksSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonWeeksSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
