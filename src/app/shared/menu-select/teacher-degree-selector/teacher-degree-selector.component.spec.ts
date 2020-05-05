import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDegreeSelectorComponent } from './teacher-degree-selector.component';

describe('TeacherDegreeSelectorComponent', () => {
  let component: TeacherDegreeSelectorComponent;
  let fixture: ComponentFixture<TeacherDegreeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherDegreeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherDegreeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
