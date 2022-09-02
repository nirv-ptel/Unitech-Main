import { TestBed } from '@angular/core/testing';

import { TimeGetService } from './time-get.service';

describe('TimeGetService', () => {
  let service: TimeGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
