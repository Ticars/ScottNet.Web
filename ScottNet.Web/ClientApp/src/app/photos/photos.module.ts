import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { photoRouting } from './photo.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotoUploadTestComponent } from './photo-upload-test/photo-upload-test.component';

@NgModule({
  imports: [
    CommonModule,
    photoRouting,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PhotoUploadComponent, PhotoUploadTestComponent]
})
export class PhotosModule { }
