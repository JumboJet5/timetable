import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnabledSemestersComponent } from './enabled-semesters.component';

describe('EnabledSemestersComponent', () => {
  let component: EnabledSemestersComponent;
  let fixture: ComponentFixture<EnabledSemestersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnabledSemestersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnabledSemestersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
