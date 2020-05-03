import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewObjectTableComponent } from './view-object-table.component';

describe('ViewObjectTableComponent', () => {
  let component: ViewObjectTableComponent;
  let fixture: ComponentFixture<ViewObjectTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewObjectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewObjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
