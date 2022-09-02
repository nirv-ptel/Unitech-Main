import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndentComponent } from './view-indent.component';

describe('ViewIndentComponent', () => {
  let component: ViewIndentComponent;
  let fixture: ComponentFixture<ViewIndentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIndentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIndentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
