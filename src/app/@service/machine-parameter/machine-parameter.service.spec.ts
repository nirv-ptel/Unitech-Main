import { TestBed } from '@angular/core/testing';

import { MachineParameterService } from './machine-parameter.service';

describe('MachineParameterService', () => {
  let service: MachineParameterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MachineParameterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
