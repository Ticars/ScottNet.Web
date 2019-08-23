import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AlertService } from '../../shared';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isRequesting: boolean = false
  submitted: boolean = false
  resetPasswordForm: FormGroup
  errors: string


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  get f() { return this.resetPasswordForm.controls; }

  resetPassword() {

    this.submitted = true;
    const userId: string = this.route.snapshot.queryParamMap.get('userId')
    const token: string = this.route.snapshot.queryParamMap.get('token');

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isRequesting = true;
    this.userService.passwordReset(userId, token, this.f.password.value).subscribe(
      (result) => {
        this.alertService.success("Your password has been reset.  Please login.", false, true)
        this.router.navigate(['/login'])
      },
      (error) => {
        if (error.error.success !== undefined) {
          if (error.error.apiError.errorCode === 'RPEXP') {
            this.alertService.error('Email is not registered.   Please re-enter email or <a href="/register">register</a>', true, false)
          } else if (error.error.apiError.errorCode === 'REACV') {
            this.alertService.error('Email is already confirmed.  Please re-enter email or <a href="/login">login</a>', true, false)
          }
          else {
            this.alertService.error(error.error.message, false, false);
          }
        } else {
          this.alertService.error(error.message, false, false);
        }
      }
    )

  }

}
