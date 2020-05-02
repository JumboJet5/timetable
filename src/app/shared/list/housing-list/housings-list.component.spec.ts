import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingsListComponent } from 'src/app/shared/list/housing-list/housings-list.component';

describe('HousingComponent', () => {
  let component: HousingsListComponent;
  let fixture: ComponentFixture<HousingsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HousingsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
