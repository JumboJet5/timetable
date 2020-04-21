import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyThemesComponent } from './faculty-themes.component';

describe('FacultyThemesComponent', () => {
  let component: FacultyThemesComponent;
  let fixture: ComponentFixture<FacultyThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
