import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, IUserRegistration, AlertService } from '../../shared';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;
  isRequesting: boolean = false;
  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.mustMatch('password', 'confirmPassword') });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.isRequesting = true;
    this.userService.register(this.f.email.value, this.f.password.value, this.f.firstName.value, this.f.lastName.value)
      .pipe(first())
      .subscribe(
        data => {
            this.alertService.success('<strong>Account Created!</strong> Please validate your email before logging in', true)
            this.router.navigate(['/login'], { queryParams: { email: this.f.email.value } });
        },
        error => {
          if (error.error.success !== undefined) {  //if we're a snet error
            this.alertService.error(error.error.message)
          } else {
            this.alertService.error(error.message)
            console.log(error)
          }
        }
      );
  }

}

