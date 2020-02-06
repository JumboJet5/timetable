import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTypeSelectComponent } from './lesson-type-select.component';

describe('LessonTypeSelectComponent', () => {
  let component: LessonTypeSelectComponent;
  let fixture: ComponentFixture<LessonTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
