import { TestBed } from '@angular/core/testing';

import { ProductsBackendService } from './products-backend.service';

describe('ProductsBackendService', () => {
  let service: ProductsBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
