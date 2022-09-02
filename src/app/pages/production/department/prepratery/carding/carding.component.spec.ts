import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardingComponent } from './carding.component';

describe('CardingComponent', () => {
  let component: CardingComponent;
  let fixture: ComponentFixture<CardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
