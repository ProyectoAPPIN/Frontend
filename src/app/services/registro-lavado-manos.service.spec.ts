import { TestBed } from '@angular/core/testing';

import { RegistroLavadoManosService } from './registro-lavado-manos.service';

describe('RegistroLavadoManosService', () => {
  let service: RegistroLavadoManosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroLavadoManosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
