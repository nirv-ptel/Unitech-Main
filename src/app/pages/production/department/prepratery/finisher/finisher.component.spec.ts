import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinisherComponent } from './finisher.component';

describe('FinisherComponent', () => {
  let component: FinisherComponent;
  let fixture: ComponentFixture<FinisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinisherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
