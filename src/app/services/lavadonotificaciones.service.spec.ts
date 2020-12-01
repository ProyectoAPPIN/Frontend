import { TestBed } from '@angular/core/testing';

import { LavadonotificacionesService } from './lavadonotificaciones.service';

describe('LavadonotificacionesService', () => {
  let service: LavadonotificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LavadonotificacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
