import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegistrationFormComponent, LoginFormComponent } from "./index";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { ResendValidationComponent } from "./resend-validation/resend-validation.component";

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'account/resendConfirmation', component: ResendValidationComponent },
  { path: 'account/confirm', component: ConfirmEmailComponent }
]);
