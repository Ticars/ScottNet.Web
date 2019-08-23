import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, AlertService } from '../../shared';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrls: ['./reset-password-request.component.css']
})
export class ResetPasswordRequestComponent implements OnInit {

  isRequesting: boolean = false
  submitted: boolean = false
  resetRequestForm: FormGroup
  errors: string


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.resetRequestForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get f() { return this.resetRequestForm.controls; }

  requestReset() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetRequestForm.invalid) {
      return;
    }

    this.isRequesting = true;
    this.userService.passwordResetRequest(this.f.lastName.value, this.f.email.value).subscribe(
      (result) => {
        this.alertService.success("Please check your email for password reset link", false, true)
        this.router.navigate(['/login'])
      },
      (error) => {
        if (error.error.success !== undefined) {
          this.alertService.error('Last name and email do not match a registered account. Please re-enter email and/or last name.', true, false)
         }
         else {
          this.alertService.error(error.message, false, false);
        }
      }
    )

  }

}
