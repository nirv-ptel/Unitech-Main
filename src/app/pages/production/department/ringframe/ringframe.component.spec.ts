import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingframeComponent } from './ringframe.component';

describe('RingframeComponent', () => {
  let component: RingframeComponent;
  let fixture: ComponentFixture<RingframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RingframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RingframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
