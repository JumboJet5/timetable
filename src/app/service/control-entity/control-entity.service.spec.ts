import { TestBed } from '@angular/core/testing';

import { ControlEntityService } from './control-entity.service';

describe('ControlEntityService', () => {
  let service: ControlEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
