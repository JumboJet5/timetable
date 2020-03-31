import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessontimeComponent } from './create-lessontime.component';

describe('CreateLessontimeComponent', () => {
  let component: CreateLessontimeComponent;
  let fixture: ComponentFixture<CreateLessontimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLessontimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLessontimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
