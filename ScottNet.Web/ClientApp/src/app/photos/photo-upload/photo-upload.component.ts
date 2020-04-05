import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoService } from '../../shared/photo.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { UserService, AlertService } from '../../shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fileValidator } from './fileValidator';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  photoUploadForm: FormGroup
  constructor(private formBuilder: FormBuilder,
    private alertService: AlertService,
    private photoService: PhotoService) { }

  ngOnInit() {
    this.photoUploadForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      file: [null, [fileValidator.fileRequired]]
    });
  }

  imgURL: any;
  fileToUpload: File;
  progress: number
  uploadInProgress: boolean
  submitted: boolean
  isRequesting: boolean

  preview(files) {
    if (files.length === 0)
      return;
    this.fileToUpload = files[0];
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.alertService.error("Only images are supported.");
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  get f() { return this.photoUploadForm.controls; }


  clearValues() {
    this.f.description.setValue('');
    this.imgURL = null;
    this.fileToUpload = null;


  }
  photoUpload() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.photoUploadForm.invalid) {
      this.alertService.error('Upload Form Invalid', false);
      return;
    }
    
    
    const formData = new FormData();

    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('description', this.f.description.value);
    this.progress = 0
    
    this.photoService
      .postImage(formData)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request sent!');
            this.uploadInProgress = false;
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(100 * event.loaded / event.total);
            console.log('download %' + this.progress)
            console.log(`Download in progress! ${Math.round(event.loaded / 1024)}Kb loaded`);
            break;
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            this.alertService.success('File Uploaded');
            this.clearValues();
            this.submitted = false;
        }
      }, (error) => { console.log('component') }
    );
    this.isRequesting = false;
  }
}
