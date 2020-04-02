import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncSelectorWithFiltersComponent } from './async-selector-with-filters.component';

describe('AsyncSelectorWithFiltersComponent', () => {
  let component: AsyncSelectorWithFiltersComponent;
  let fixture: ComponentFixture<AsyncSelectorWithFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncSelectorWithFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncSelectorWithFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
