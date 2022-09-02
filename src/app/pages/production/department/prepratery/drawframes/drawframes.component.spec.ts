import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawframesComponent } from './drawframes.component';

describe('DrawframesComponent', () => {
  let component: DrawframesComponent;
  let fixture: ComponentFixture<DrawframesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawframesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawframesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
