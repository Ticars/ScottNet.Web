import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegistrationFormComponent, LoginFormComponent } from "./index";

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent }
]);
