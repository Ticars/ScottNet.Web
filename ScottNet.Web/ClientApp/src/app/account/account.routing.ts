import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RegistrationFormComponent, LoginFormComponent } from "./index";
import { ConfirmEmailComponent } from "./confirm-email/confirm-email.component";
import { ResendValidationComponent } from "./resend-validation/resend-validation.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { ResetPasswordRequestComponent } from "./reset-password-request/reset-password-request.component";

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'account/resendConfirmation', component: ResendValidationComponent },
  { path: 'account/confirm', component: ConfirmEmailComponent },
  { path: 'account/resetPasswordRequest', component: ResetPasswordRequestComponent },
  { path: 'account/resetPassword', component: ResetPasswordComponent }


]);
