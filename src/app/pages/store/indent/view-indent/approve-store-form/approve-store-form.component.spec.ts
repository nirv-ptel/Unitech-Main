import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStoreFormComponent } from './approve-store-form.component';

describe('ApproveStoreFormComponent', () => {
  let component: ApproveStoreFormComponent;
  let fixture: ComponentFixture<ApproveStoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveStoreFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
