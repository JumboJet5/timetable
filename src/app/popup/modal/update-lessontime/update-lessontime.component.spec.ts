import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLessontimeComponent } from 'src/app/popup/modal/update-lessontime/update-lessontime.component';

describe('UpdateLessontimeComponent', () => {
  let component: UpdateLessontimeComponent;
  let fixture: ComponentFixture<UpdateLessontimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLessontimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLessontimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
