import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartControlEntityComponent } from './smart-control-entity.component';

describe('SmartControlEntityComponent', () => {
  let component: SmartControlEntityComponent;
  let fixture: ComponentFixture<SmartControlEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartControlEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartControlEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
