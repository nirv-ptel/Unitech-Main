import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUnitComponent } from './product-unit.component';

describe('ProductUnitComponent', () => {
  let component: ProductUnitComponent;
  let fixture: ComponentFixture<ProductUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
