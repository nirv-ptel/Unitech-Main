import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloowroomComponent } from './bloowroom.component';

describe('BloowroomComponent', () => {
  let component: BloowroomComponent;
  let fixture: ComponentFixture<BloowroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloowroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloowroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
