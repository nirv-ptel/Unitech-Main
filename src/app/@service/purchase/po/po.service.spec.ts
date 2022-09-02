import { TestBed } from '@angular/core/testing';

import { PoService } from './po.service';

describe('PoService', () => {
  let service: PoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
