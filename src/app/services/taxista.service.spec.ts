import { TestBed } from '@angular/core/testing';

import { TaxistaService } from './taxista.service';

describe('TaxistaService', () => {
  let service: TaxistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
