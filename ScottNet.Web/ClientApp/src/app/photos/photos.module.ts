import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { photoRouting } from './photo.routing';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    photoRouting,
    SharedModule,
    FormsModule
  ],
  declarations: [PhotoUploadComponent]
})
export class PhotosModule { }
