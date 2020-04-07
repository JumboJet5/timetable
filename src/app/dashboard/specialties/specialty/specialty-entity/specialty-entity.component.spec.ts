import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtyEntityComponent } from './specialty-entity.component';

describe('SpecialtyEntityComponent', () => {
  let component: SpecialtyEntityComponent;
  let fixture: ComponentFixture<SpecialtyEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialtyEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialtyEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
