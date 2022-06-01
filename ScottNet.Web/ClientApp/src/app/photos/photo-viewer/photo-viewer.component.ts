import { Component, OnInit, OnDestroy } from '@angular/core';
import { PhotoService } from '../../shared/photo.service';
import { IImageGroup, IImageInstance } from '../../shared/photoModels';
import { timer, Observable, Subscription } from 'rxjs';
import { UserService } from '../../shared';

@Component({
  selector: 'photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css']
})
export class PhotoViewerComponent implements OnInit, OnDestroy {
  private photoRefreshTimer = timer(10, 60 * 1000);
  private maxRefreshes = 60;
  private refreshSubscription: Subscription
  public randomPhoto: IImageGroup
  public randomPhotoInstance: IImageInstance
  public isAuthenticated: boolean

  constructor(private photoService: PhotoService, private userService: UserService) { }
  

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated();
    this.refreshSubscription = this.photoRefreshTimer.subscribe((count) => {
      console.log("refresh #" + count)
      this.getRandomImage()
      if (count >= this.maxRefreshes) { this.refreshSubscription.unsubscribe() }
    });  
  }

  ngOnDestroy(): void {
    this.refreshSubscription.unsubscribe()
  }

  getRandomImage() {
    this.photoService.getRandomImage().subscribe(
      result => {
        this.randomPhoto = result;
        this.randomPhotoInstance = this.randomPhoto.instances.filter(instance => instance.formatOrder < 30).sort((n1, n2) => n2.formatOrder - n1.formatOrder)[0];
      });
  }

}
