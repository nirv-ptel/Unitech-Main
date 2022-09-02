import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetParameterComponent } from './set-parameter.component';

describe('SetParameterComponent', () => {
  let component: SetParameterComponent;
  let fixture: ComponentFixture<SetParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
