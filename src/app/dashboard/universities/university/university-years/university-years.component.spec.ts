import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityYearsComponent } from './university-years.component';

describe('UniversityYearsComponent', () => {
  let component: UniversityYearsComponent;
  let fixture: ComponentFixture<UniversityYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
