import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitySelectComponent } from './university-select.component';

describe('UniversitySelectComponent', () => {
  let component: UniversitySelectComponent;
  let fixture: ComponentFixture<UniversitySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversitySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
