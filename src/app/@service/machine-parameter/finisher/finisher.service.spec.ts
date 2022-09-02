import { TestBed } from '@angular/core/testing';

import { FinisherService } from './finisher.service';

describe('FinisherService', () => {
  let service: FinisherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinisherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
