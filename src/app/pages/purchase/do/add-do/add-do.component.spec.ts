import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoComponent } from './add-do.component';

describe('AddDoComponent', () => {
  let component: AddDoComponent;
  let fixture: ComponentFixture<AddDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
