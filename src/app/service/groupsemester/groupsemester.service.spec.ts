import { TestBed } from '@angular/core/testing';

import { GroupsemesterService } from './groupsemester.service';

describe('GroupsemesterService', () => {
  let service: GroupsemesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsemesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
