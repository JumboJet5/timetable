import { TestBed } from '@angular/core/testing';

import { DateFormatService } from 'app/shared/services/date-format/date-format.service';

describe('DateFormatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateFormatService = TestBed.get(DateFormatService);
    expect(service).toBeTruthy();
  });
});
