import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingsInfoComponent } from './housings-info.component';

describe('HousingsInfoComponent', () => {
  let component: HousingsInfoComponent;
  let fixture: ComponentFixture<HousingsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
