import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './account.routing';
import { SharedModule } from '../shared/shared.module';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ResendValidationComponent } from './resend-validation/resend-validation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './reset-password-request/reset-password-request.component';


@NgModule({
  imports: [
    CommonModule, FormsModule, routing, SharedModule, ReactiveFormsModule
  ],
  declarations: [RegistrationFormComponent, LoginFormComponent, ConfirmEmailComponent, ResendValidationComponent, ResetPasswordComponent, ResetPasswordRequestComponent],
  providers: []
})
export class AccountModule { }
