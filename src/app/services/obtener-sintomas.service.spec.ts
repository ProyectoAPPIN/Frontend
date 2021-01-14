import { TestBed } from '@angular/core/testing';

import { ObtenerSintomasService } from './obtener-sintomas.service';

describe('ObtenerSintomasService', () => {
  let service: ObtenerSintomasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerSintomasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
