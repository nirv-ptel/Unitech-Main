import { TestBed } from '@angular/core/testing';

import { WindingService } from './winding.service';

describe('WindingService', () => {
  let service: WindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
