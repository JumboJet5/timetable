import { TestBed } from '@angular/core/testing';

import { YearEntityService } from './year-entity.service';

describe('YearEntityService', () => {
  let service: YearEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
