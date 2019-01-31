import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { aboutRoutes } from './about.routes';
import { ToDoComponent } from './index';
import { NewsComponent } from './news/news.component';
import { ReleaseNotesComponent } from './releases/releases.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(aboutRoutes)
  ],
  declarations: [
    ToDoComponent,
    NewsComponent,
    ReleaseNotesComponent
  ]
})
export class AboutModule { }
