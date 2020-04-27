import { TestBed } from '@angular/core/testing';

import { FacultyEntityService } from 'src/app/service/faculty-entity/faculty-entity.service';

describe('FavultyEntityService', () => {
  let service: FacultyEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacultyEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
