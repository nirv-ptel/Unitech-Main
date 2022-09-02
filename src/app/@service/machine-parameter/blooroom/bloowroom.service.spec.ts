import { TestBed } from '@angular/core/testing';

import { BloowroomService } from './bloowroom.service';

describe('BloowroomService', () => {
  let service: BloowroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BloowroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
