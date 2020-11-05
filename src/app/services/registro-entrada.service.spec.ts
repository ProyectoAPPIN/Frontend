import { TestBed } from '@angular/core/testing';

import { RegistroEntradaService } from './registro-entrada.service';

describe('RegistroEntradaService', () => {
  let service: RegistroEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
