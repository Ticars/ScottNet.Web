import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUploadTestComponent } from './photo-upload-test.component';

describe('PhotoUploadTestComponent', () => {
  let component: PhotoUploadTestComponent;
  let fixture: ComponentFixture<PhotoUploadTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoUploadTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUploadTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
