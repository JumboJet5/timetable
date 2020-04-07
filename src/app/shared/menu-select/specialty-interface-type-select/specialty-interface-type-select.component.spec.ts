import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyInterfaceTypeSelectComponent } from './specialty-interface-type-select.component';

describe('SpecialtyInterfaceTypeSelectComponent', () => {
  let component: SpecialtyInterfaceTypeSelectComponent;
  let fixture: ComponentFixture<SpecialtyInterfaceTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyInterfaceTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyInterfaceTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
