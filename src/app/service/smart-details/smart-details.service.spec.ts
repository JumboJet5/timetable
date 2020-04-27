import { TestBed } from '@angular/core/testing';

import { SmartDetailsService } from './smart-details.service';

describe('SmartDetailsService', () => {
  let service: SmartDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
