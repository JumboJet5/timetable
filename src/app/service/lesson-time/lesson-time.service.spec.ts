import { TestBed } from '@angular/core/testing';

import { LessonTimeService } from './lesson-time.service';

describe('LessonTimeService', () => {
  let service: LessonTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LessonTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
