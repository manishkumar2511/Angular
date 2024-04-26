import { TestBed } from '@angular/core/testing';

import { LoderInterceptorService } from './loder-interceptor.service';

describe('LoderInterceptorService', () => {
  let service: LoderInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoderInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
