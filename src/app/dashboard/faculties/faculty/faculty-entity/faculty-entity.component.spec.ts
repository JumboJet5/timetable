import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyEntityComponent } from './faculty-entity.component';

describe('FacultyEntityComponent', () => {
  let component: FacultyEntityComponent;
  let fixture: ComponentFixture<FacultyEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
