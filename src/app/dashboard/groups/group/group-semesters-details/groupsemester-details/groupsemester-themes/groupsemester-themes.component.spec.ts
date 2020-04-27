import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsemesterThemesComponent } from './groupsemester-themes.component';

describe('GroupsemesterThemesComponent', () => {
  let component: GroupsemesterThemesComponent;
  let fixture: ComponentFixture<GroupsemesterThemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsemesterThemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsemesterThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
