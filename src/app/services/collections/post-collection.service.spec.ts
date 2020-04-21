import { TestBed } from '@angular/core/testing';

import { PostCollectionService } from './post-collection.service';

describe('PostCollectionService', () => {
  let service: PostCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
