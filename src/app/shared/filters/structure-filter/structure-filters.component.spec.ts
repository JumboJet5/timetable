import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureFiltersComponent } from '@app/shared/filters/structure-filter/structure-filters.component';

describe('GroupListFilterComponent', () => {
  let component: StructureFiltersComponent;
  let fixture: ComponentFixture<StructureFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StructureFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
