import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesInfoComponent } from './specialties-info.component';

describe('SpecialtiesInfoComponent', () => {
  let component: SpecialtiesInfoComponent;
  let fixture: ComponentFixture<SpecialtiesInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtiesInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtiesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
