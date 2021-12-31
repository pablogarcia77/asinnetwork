import { TestBed } from '@angular/core/testing';

import { AsincashService } from './asincash.service';

describe('AsincashService', () => {
  let service: AsincashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsincashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
