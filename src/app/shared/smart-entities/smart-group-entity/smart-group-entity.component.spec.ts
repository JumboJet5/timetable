import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGroupEntityComponent } from './smart-group-entity.component';

describe('SmartGroupEntityComponent', () => {
  let component: SmartGroupEntityComponent;
  let fixture: ComponentFixture<SmartGroupEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartGroupEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartGroupEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
