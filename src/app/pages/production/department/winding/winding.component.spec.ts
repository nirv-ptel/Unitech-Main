import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindingComponent } from './winding.component';

describe('WindingComponent', () => {
  let component: WindingComponent;
  let fixture: ComponentFixture<WindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
