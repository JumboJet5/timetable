import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityHousingsComponent } from 'src/app/dashboard/universities/university/university-housings/university-housings.component';

describe('UniversityHousingComponent', () => {
  let component: UniversityHousingsComponent;
  let fixture: ComponentFixture<UniversityHousingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UniversityHousingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityHousingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
