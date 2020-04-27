import { TestBed } from '@angular/core/testing';

import { HousingEntityService } from './housing-entity.service';

describe('HousingEntityService', () => {
  let service: HousingEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
