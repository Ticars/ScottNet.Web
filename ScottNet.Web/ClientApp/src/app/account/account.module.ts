import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { routing } from './account.routing';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule, FormsModule, routing, SharedModule
  ],
  declarations: [RegistrationFormComponent, LoginFormComponent],
  providers: []
})
export class AccountModule { }
