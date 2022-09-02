import { TestBed } from '@angular/core/testing';

import { DrawframesService } from './drawframes.service';

describe('DrawframesService', () => {
  let service: DrawframesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawframesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
