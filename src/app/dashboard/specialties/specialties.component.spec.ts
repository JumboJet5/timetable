import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesComponent } from 'src/app/dashboard/specialties/specialties.component';

describe('SpecialtyComponent', () => {
  let component: SpecialtiesComponent;
  let fixture: ComponentFixture<SpecialtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialtiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
