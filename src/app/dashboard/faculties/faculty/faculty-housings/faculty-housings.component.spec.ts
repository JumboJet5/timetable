import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyHousingsComponent } from './faculty-housings.component';

describe('FacultyHousingsComponent', () => {
  let component: FacultyHousingsComponent;
  let fixture: ComponentFixture<FacultyHousingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyHousingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyHousingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
