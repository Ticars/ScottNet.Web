import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../shared';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-resend-validation',
  templateUrl: './resend-validation.component.html',
  styleUrls: ['./resend-validation.component.css']
})
export class ResendValidationComponent implements OnInit {
  isRequesting: boolean = false
  submitted: boolean = false
  confirmSend: FormGroup
  errors: string
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.confirmSend = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get f() { return this.confirmSend.controls; }

  sendEmail() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.confirmSend.invalid) {
      return;
    }

    this.isRequesting = true;
    this.userService.resendConfirmation(this.f.email.value).subscribe(
      (result) => {
          this.alertService.success("Please confirm your email before logging in", false, true)
          this.router.navigate(['/login'])
      },
      (error) => {
        if (error.error.success !== undefined) {
          if (error.error.apiError.errorCode === 'REINV') {
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
