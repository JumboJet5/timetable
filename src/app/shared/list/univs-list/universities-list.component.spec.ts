import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitiesListComponent } from 'src/app/shared/list/univs-list/universities-list.component';

describe('UnivsListComponent', () => {
  let component: UniversitiesListComponent;
  let fixture: ComponentFixture<UniversitiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UniversitiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
