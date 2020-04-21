import { TestBed } from '@angular/core/testing';

import { UserAccountCollectionService } from './user-account-collection.service';

describe('UserAccountCollectionService', () => {
  let service: UserAccountCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAccountCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
