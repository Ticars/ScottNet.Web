import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegistrationFormComponent, LoginFormComponent } from "./index";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'account/confirm', component: ConfirmEmailComponent }
]);
