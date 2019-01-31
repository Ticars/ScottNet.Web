import { NewsComponent, ToDoComponent, ReleaseNotesComponent } from "./index";
import { Routes } from "@angular/router";


export const aboutRoutes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'ToDo', component: ToDoComponent },
  { path: 'Releases', component: ReleaseNotesComponent }
]
