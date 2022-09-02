import { TestBed } from '@angular/core/testing';

import { VenderService } from './vender.service';

describe('VenderService', () => {
  let service: VenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
