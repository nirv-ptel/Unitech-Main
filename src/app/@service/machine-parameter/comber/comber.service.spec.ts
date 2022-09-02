import { TestBed } from '@angular/core/testing';

import { ComberService } from './comber.service';

describe('ComberService', () => {
  let service: ComberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
