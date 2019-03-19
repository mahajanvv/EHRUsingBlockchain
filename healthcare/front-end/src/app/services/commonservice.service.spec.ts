import { TestBed } from '@angular/core/testing';

import { CommonserviceService } from './commonservice.service';

describe('CommonserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonserviceService = TestBed.get(CommonserviceService);
    expect(service).toBeTruthy();
  });
});
