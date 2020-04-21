import { TestBed } from '@angular/core/testing';

import { CommentCollectionService } from './comment-collection.service';

describe('CommentCollectionService', () => {
  let service: CommentCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
