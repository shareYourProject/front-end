import { TestBed } from '@angular/core/testing';

import { LoggedUserResolverService } from './logged-user-resolver.service';

describe('LoggedUserResolverService', () => {
  let service: LoggedUserResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedUserResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
