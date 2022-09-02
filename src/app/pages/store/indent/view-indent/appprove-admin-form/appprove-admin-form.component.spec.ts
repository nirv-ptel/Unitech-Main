import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppproveAdminFormComponent } from './appprove-admin-form.component';

describe('AppproveAdminFormComponent', () => {
  let component: AppproveAdminFormComponent;
  let fixture: ComponentFixture<AppproveAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppproveAdminFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppproveAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
