import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PhotoUploadComponent } from "./photo-upload/photo-upload.component";
import { AuthGuardService } from "../shared";
import { PhotoUploadTestComponent } from "./photo-upload-test/photo-upload-test.component";
import { PhotoViewerComponent } from "./photo-viewer/photo-viewer.component";

export const photoRouting: ModuleWithProviders = RouterModule.forChild([
  { path: 'photo', component: PhotoViewerComponent },
  { path: 'photo/upload', component: PhotoUploadComponent, canActivate: [AuthGuardService] },
  { path: 'photo/test', component: PhotoUploadTestComponent, canActivate: [AuthGuardService] },
  { path: 'photo/viewer', component: PhotoViewerComponent }
]);
