import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderDetailsComponent } from './vender-details.component';

describe('VenderDetailsComponent', () => {
  let component: VenderDetailsComponent;
  let fixture: ComponentFixture<VenderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenderDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
