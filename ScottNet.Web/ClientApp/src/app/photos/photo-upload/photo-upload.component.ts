import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PhotoService } from '../../shared/photo.service';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  @ViewChild('file')
  myInputVariable: ElementRef;
  progress: number
  uploadInProgress: boolean
  messages: string[]
  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.messages = []
  }


  uploadFile(files) {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
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
            this.uploadInProgress = false
            this.myInputVariable.nativeElement.value = null
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
      }
      );

    
  }

  public uploadFiles(files: File[]) {

    //// The given files collection is actually a "live collection", which means that
    //// it will be cleared once the Input is cleared. As such, we need to create a
    //// local copy of it so that it doesn't get cleared during the asynchronous file
    //// processing within the for-of loop.
    //for (var file of Array.from(files)) {

    //  try {

    //    this.uploads.push(

  }
}
