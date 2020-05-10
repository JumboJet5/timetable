import { TestBed } from '@angular/core/testing';

import { PeriodEntityService } from './period-entity.service';

describe('PeriodEntityService', () => {
  let service: PeriodEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
