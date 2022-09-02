import { TestBed } from '@angular/core/testing';

import { LapformerService } from './lapformer.service';

describe('LapformerService', () => {
  let service: LapformerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LapformerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
