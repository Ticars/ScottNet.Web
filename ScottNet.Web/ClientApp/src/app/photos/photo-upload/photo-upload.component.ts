import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoService } from '../../shared/photo.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { UserService } from '../../shared';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
  }

  public imagePath;
  imgURL: any;
  public message: string;
  progress: number
  uploadInProgress: boolean
  submitted: boolean

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  upload() {

    let fileToUpload = <File>this.imagePath[0];
    const formData = new FormData();

    formData.append('file', fileToUpload, fileToUpload.name);
    this.progress = 0
    this.uploadInProgress = true;
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
            console.log('Done!', event.body);
        }
      }, (error) => { console.log('component') }
      );
  }
}
