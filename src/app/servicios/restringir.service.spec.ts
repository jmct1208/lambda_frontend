import { TestBed } from '@angular/core/testing';

import { RestringirService } from './restringir.service';

describe('RestringirService', () => {
  let service: RestringirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestringirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
