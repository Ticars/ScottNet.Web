import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PhotoService } from '../../shared/photo.service';
import { UserService } from '../../shared';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-photo-upload-test',
  templateUrl: './photo-upload-test.component.html',
  styleUrls: ['./photo-upload-test.component.css']
})
export class PhotoUploadTestComponent implements OnInit {
  @ViewChild('file')
  myInputVariable: ElementRef;
  progress: number
  uploadInProgress: boolean
  messages: string[]
  isLoggedOn: boolean
  constructor(private photoService: PhotoService, private userService: UserService) {
    this.isLoggedOn = userService.isAuthenticated();
  }

  ngOnInit() {
    this.messages = []
  }


  uploadFile(files) {
    console.log('uploading ' + files.length)
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
      }, (error) => { console.log('component') }
      );
  }

  public callSecure() {
    this.messages = []
    this.photoService.testSecure().subscribe(
      (result) => {
        console.log(result)
        this.messages = this.messages.concat(result)
      })

    this.photoService.testSecure().subscribe(
      (result) => {
        console.log(result)
        this.messages = this.messages.concat(result)
      })
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
