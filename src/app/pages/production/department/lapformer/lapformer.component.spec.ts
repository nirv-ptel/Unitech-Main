import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LapformerComponent } from './lapformer.component';

describe('LapformerComponent', () => {
  let component: LapformerComponent;
  let fixture: ComponentFixture<LapformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LapformerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LapformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
