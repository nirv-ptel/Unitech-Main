import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteroomComponent } from './wasteroom.component';

describe('WasteroomComponent', () => {
  let component: WasteroomComponent;
  let fixture: ComponentFixture<WasteroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WasteroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
