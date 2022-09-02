import { TestBed } from '@angular/core/testing';

import { PackingService } from './packing.service';

describe('PackingService', () => {
  let service: PackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
