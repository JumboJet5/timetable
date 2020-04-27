import { TestBed } from '@angular/core/testing';

import { GroupEntityService } from 'src/app/service/group-entity/group-entity.service';

describe('GroupEntityService', () => {
  let service: GroupEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
