import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSemesterEntityComponent } from 'src/app/shared/smart-entities/smart-semester-entity/smart-semester-entity.component';

describe('SmartSemesterEntityComponent', () => {
  let component: SmartSemesterEntityComponent;
  let fixture: ComponentFixture<SmartSemesterEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartSemesterEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSemesterEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
