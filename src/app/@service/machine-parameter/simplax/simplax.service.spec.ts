import { TestBed } from '@angular/core/testing';

import { SimplaxService } from './simplax.service';

describe('SimplaxService', () => {
  let service: SimplaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimplaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
