import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugNavComponent } from './debug-nav.component';

describe('DebugNavComponent', () => {
  let component: DebugNavComponent;
  let fixture: ComponentFixture<DebugNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebugNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebugNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
