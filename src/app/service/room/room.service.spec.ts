import { TestBed } from '@angular/core/testing';

import { RoomService } from 'src/app/service/room/room.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
