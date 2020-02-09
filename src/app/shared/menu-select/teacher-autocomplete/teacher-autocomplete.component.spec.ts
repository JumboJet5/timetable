import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAutocompleteComponent } from './teacher-autocomplete.component';

describe('TeacherAutocompleteComponent', () => {
  let component: TeacherAutocompleteComponent;
  let fixture: ComponentFixture<TeacherAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
