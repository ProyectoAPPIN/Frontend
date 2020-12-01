import { TestBed } from '@angular/core/testing';

import { UltimoLavadoService } from './ultimo-lavado.service';

describe('UltimoLavadoService', () => {
  let service: UltimoLavadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltimoLavadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
