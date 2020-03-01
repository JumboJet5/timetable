import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListFilterComponent } from './group-list-filter.component';

describe('GroupListFilterComponent', () => {
  let component: GroupListFilterComponent;
  let fixture: ComponentFixture<GroupListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
