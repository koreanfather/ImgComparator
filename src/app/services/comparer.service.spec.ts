import { TestBed } from '@angular/core/testing';

import { ComparerService } from './comparer.service';

describe('ComparerService', () => {
  let service: ComparerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComparerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
