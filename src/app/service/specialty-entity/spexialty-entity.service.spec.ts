import { TestBed } from '@angular/core/testing';

import { SpecialtyEntityService } from 'src/app/service/specialty-entity/specialty-entity.service';

describe('SpexialtyEntityService', () => {
  let service: SpecialtyEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialtyEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
