import { TestBed } from '@angular/core/testing';

import { RingframeService } from './ringframe.service';

describe('RingframeService', () => {
  let service: RingframeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RingframeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
