import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombersComponent } from './combers.component';

describe('CombersComponent', () => {
  let component: CombersComponent;
  let fixture: ComponentFixture<CombersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
