import { TestBed } from '@angular/core/testing';

import { ProjectCollectionService } from './project-collection.service';

describe('ProjectCollectionService', () => {
  let service: ProjectCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
