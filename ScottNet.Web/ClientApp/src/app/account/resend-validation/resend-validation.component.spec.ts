import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendValidationComponent } from './resend-validation.component';

describe('ResendValidationComponent', () => {
  let component: ResendValidationComponent;
  let fixture: ComponentFixture<ResendValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
