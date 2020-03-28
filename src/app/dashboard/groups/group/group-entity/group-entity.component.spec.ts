import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEntityComponent } from './group-entity.component';

describe('GroupEntityComponent', () => {
  let component: GroupEntityComponent;
  let fixture: ComponentFixture<GroupEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
