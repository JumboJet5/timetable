import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSpecialtyEntityComponent } from './smart-specialty-entity.component';

describe('SmartSpecialtyEntityComponent', () => {
  let component: SmartSpecialtyEntityComponent;
  let fixture: ComponentFixture<SmartSpecialtyEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartSpecialtyEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSpecialtyEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
