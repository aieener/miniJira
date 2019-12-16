import { TestBed } from '@angular/core/testing';

import { DrapDropService } from './drap-drop.service';

describe('DrapDropService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrapDropService = TestBed.get(DrapDropService);
    expect(service).toBeTruthy();
  });
});
