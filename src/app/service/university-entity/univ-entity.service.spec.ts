import { TestBed } from '@angular/core/testing';

import { UniversityEntityService } from 'src/app/service/university-entity/university-entity.service';

describe('UnivEntityService', () => {
  let service: UniversityEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversityEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
