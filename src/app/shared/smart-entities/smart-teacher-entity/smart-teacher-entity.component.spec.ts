import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTeacherEntityComponent } from './smart-teacher-entity.component';

describe('SmartTeacherEntityComponent', () => {
  let component: SmartTeacherEntityComponent;
  let fixture: ComponentFixture<SmartTeacherEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartTeacherEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTeacherEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
