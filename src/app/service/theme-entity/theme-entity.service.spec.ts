import { TestBed } from '@angular/core/testing';

import { ThemeEntityService } from './theme-entity.service';

describe('ThemeEntityService', () => {
  let service: ThemeEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
