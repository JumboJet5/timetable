import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySelectComponent } from 'src/app/shared/menu-select/faculty-select/faculty-select.component';

describe('FacultyComponent', () => {
  let component: FacultySelectComponent;
  let fixture: ComponentFixture<FacultySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FacultySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
