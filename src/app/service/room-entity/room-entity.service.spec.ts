import { TestBed } from '@angular/core/testing';

import { RoomEntityService } from './room-entity.service';

describe('RoomEntityService', () => {
  let service: RoomEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
