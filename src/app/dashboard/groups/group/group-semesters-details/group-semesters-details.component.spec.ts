import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSemestersDetailsComponent } from './group-semesters-details.component';

describe('GroupSemestersDetailsComponent', () => {
  let component: GroupSemestersDetailsComponent;
  let fixture: ComponentFixture<GroupSemestersDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSemestersDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSemestersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
