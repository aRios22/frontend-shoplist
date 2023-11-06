import { TestBed } from '@angular/core/testing';

import { ListaProductoService } from './lista-producto.service';

describe('ListaProductoService', () => {
  let service: ListaProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
