import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingEntityComponent } from './housing-entity.component';

describe('HousingEntityComponent', () => {
  let component: HousingEntityComponent;
  let fixture: ComponentFixture<HousingEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
