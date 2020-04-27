import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFacultyEntityComponent } from './smart-faculty-entity.component';

describe('SmartFacultyEntityComponent', () => {
  let component: SmartFacultyEntityComponent;
  let fixture: ComponentFixture<SmartFacultyEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartFacultyEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartFacultyEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
