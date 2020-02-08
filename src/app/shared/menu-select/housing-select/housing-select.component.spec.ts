import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingSelectComponent } from './housing-select.component';

describe('HousingSelectComponent', () => {
  let component: HousingSelectComponent;
  let fixture: ComponentFixture<HousingSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
