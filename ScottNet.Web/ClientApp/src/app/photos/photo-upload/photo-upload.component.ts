import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  fileProperties: any[]
  constructor() { }

  ngOnInit() {
    var connection = navigator['connection'] || navigator['mozConnection'] || navigator['webkitConnection'];
    var type = connection.effectiveType;
    alert(type)
  
  }
  selected(event) {

    this.fileProperties = []
    var file = event.target.files[0]
    for (let key in event.target.files[0]) {
      this.fileProperties.push({'prop': key, 'value': file[key]})
    }
  }
}
