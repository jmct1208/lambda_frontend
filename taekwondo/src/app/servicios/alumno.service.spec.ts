import { TestBed } from '@angular/core/testing';

import { ServicioAlumno } from './alumno.service';

describe('ServicioAlumno', () => {
  let service: ServicioAlumno;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAlumno);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
