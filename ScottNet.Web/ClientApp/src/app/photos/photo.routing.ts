import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PhotoUploadComponent } from "./photo-upload/photo-upload.component";

export const photoRouting: ModuleWithProviders = RouterModule.forChild([
  { path: 'upload', component: PhotoUploadComponent }
]);
