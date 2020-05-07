import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlTypeSelectorComponent } from 'src/app/shared/menu-select/control-type-selector/control-type-selector.component';

describe('ControlSelectorComponent', () => {
  let component: ControlTypeSelectorComponent;
  let fixture: ComponentFixture<ControlTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
