import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPublicComponent } from './project-public.component';

describe('ProjectPublicComponent', () => {
  let component: ProjectPublicComponent;
  let fixture: ComponentFixture<ProjectPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
