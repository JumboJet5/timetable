import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestersControlsComponent } from './semesters-controls.component';

describe('SemestersControlsComponent', () => {
  let component: SemestersControlsComponent;
  let fixture: ComponentFixture<SemestersControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemestersControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemestersControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
