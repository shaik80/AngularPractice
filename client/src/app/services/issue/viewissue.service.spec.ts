import { TestBed } from '@angular/core/testing';

import { ViewissueService } from './viewissue.service';

describe('ViewissueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewissueService = TestBed.get(ViewissueService);
    expect(service).toBeTruthy();
  });
});
