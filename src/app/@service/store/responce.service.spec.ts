import { TestBed } from '@angular/core/testing';

import { ResponceService } from './responce.service';

describe('ResponceService', () => {
  let service: ResponceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
