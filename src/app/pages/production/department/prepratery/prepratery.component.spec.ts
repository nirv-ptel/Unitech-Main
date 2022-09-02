import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreprateryComponent } from './prepratery.component';

describe('PreprateryComponent', () => {
  let component: PreprateryComponent;
  let fixture: ComponentFixture<PreprateryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreprateryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreprateryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
