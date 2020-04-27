import { TestBed } from '@angular/core/testing';

import { LessontimeEntityService } from 'src/app/service/lessontime-entity/lessontime-entity.service';

describe('LessontimeService', () => {
  let service: LessontimeEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessontimeEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
