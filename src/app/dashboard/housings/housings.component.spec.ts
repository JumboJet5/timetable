import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingsComponent } from 'src/app/dashboard/housings/housings.component';

describe('HousingsComponent', () => {
  let component: HousingsComponent;
  let fixture: ComponentFixture<HousingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HousingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
