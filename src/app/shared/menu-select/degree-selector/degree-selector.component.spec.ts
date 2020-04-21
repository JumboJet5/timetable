import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DegreeSelectorComponent } from './degree-selector.component';

describe('DegreeSelectorComponent', () => {
  let component: DegreeSelectorComponent;
  let fixture: ComponentFixture<DegreeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DegreeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DegreeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
