import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartRoomEntityComponent } from './smart-room-entity.component';

describe('SmartRoomEntityComponent', () => {
  let component: SmartRoomEntityComponent;
  let fixture: ComponentFixture<SmartRoomEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartRoomEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartRoomEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
