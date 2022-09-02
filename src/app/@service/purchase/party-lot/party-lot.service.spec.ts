import { TestBed } from '@angular/core/testing';

import { PartyLotService } from './party-lot.service';

describe('PartyLotService', () => {
  let service: PartyLotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyLotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
