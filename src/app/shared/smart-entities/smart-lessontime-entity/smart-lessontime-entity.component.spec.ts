import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLessontimeEntityComponent } from 'src/app/shared/smart-entities/smart-lessontime-entity/smart-lessontime-entity.component';

describe('SmartLessontimeEntityComponent', () => {
  let component: SmartLessontimeEntityComponent;
  let fixture: ComponentFixture<SmartLessontimeEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartLessontimeEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartLessontimeEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
