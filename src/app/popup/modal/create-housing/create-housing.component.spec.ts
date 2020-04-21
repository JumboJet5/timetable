import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHousingComponent } from 'src/app/popup/modal/create-housing/create-housing.component';

describe('CreateBuildingComponent', () => {
  let component: CreateHousingComponent;
  let fixture: ComponentFixture<CreateHousingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHousingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHousingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
