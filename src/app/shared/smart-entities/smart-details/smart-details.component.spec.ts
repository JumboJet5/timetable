import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartDetailsComponent } from './smart-details.component';

describe('SmartDetailsComponent', () => {
  let component: SmartDetailsComponent;
  let fixture: ComponentFixture<SmartDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
