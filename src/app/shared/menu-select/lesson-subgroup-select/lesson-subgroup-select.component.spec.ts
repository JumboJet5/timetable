import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonSubgroupSelectComponent } from './lesson-subgroup-select.component';

describe('LessonSubgroupSelectComponent', () => {
  let component: LessonSubgroupSelectComponent;
  let fixture: ComponentFixture<LessonSubgroupSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonSubgroupSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonSubgroupSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
