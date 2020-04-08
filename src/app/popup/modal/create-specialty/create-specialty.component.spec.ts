import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpecialtyComponent } from './create-specialty.component';

describe('CreateSpecialtyComponent', () => {
  let component: CreateSpecialtyComponent;
  let fixture: ComponentFixture<CreateSpecialtyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSpecialtyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
