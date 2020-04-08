import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyThemesComponent } from './specialty-themes.component';

describe('SpecialtyThemesComponent', () => {
  let component: SpecialtyThemesComponent;
  let fixture: ComponentFixture<SpecialtyThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
