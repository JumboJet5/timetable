import { TestBed } from '@angular/core/testing';

import { TeacherEntityService } from 'src/app/service/teacher-entity/teacher-entity.service';

describe('TeacherEntotyService', () => {
  let service: TeacherEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
