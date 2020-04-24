import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversityEntityComponent } from './university-entity.component';

describe('UniversityEntityComponent', () => {
  let component: UniversityEntityComponent;
  let fixture: ComponentFixture<UniversityEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversityEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversityEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
