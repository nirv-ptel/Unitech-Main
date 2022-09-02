import { TestBed } from '@angular/core/testing';

import { IndentService } from './indent.service';

describe('IndentService', () => {
  let service: IndentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
