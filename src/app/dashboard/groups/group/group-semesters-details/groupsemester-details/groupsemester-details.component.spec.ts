import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsemesterDetailsComponent } from './groupsemester-details.component';

describe('GroupsemesterDetailsComponent', () => {
  let component: GroupsemesterDetailsComponent;
  let fixture: ComponentFixture<GroupsemesterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsemesterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsemesterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
