import { TestBed } from '@angular/core/testing';

import { SemesterEntityService } from './semester-entity.service';

describe('SemesterEntityService', () => {
  let service: SemesterEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemesterEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
