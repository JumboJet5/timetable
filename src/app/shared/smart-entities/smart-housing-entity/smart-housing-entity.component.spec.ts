import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartHousingEntityComponent } from './smart-housing-entity.component';

describe('SmartHousingEntityComponent', () => {
  let component: SmartHousingEntityComponent;
  let fixture: ComponentFixture<SmartHousingEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartHousingEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartHousingEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
