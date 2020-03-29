import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupsemesterComponent } from './create-groupsemester.component';

describe('CreateGroupsemesterComponent', () => {
  let component: CreateGroupsemesterComponent;
  let fixture: ComponentFixture<CreateGroupsemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupsemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupsemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
