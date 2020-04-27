import { TestBed } from '@angular/core/testing';

import { GroupsemesterEntityService } from './groupsemester-entity.service';

describe('GroupsemesterEntityService', () => {
  let service: GroupsemesterEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsemesterEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
