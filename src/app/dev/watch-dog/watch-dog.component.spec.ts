import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchDogComponent } from './watch-dog.component';

describe('WatchDogComponent', () => {
  let component: WatchDogComponent;
  let fixture: ComponentFixture<WatchDogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchDogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
