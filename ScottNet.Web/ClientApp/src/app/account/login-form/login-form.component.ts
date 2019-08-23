import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, ICredentials, AlertService } from '../../shared';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  needEmailValidation: boolean = false;
  badLogin: boolean = false;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  src: string = "/"
  credentials: ICredentials = { email: '', password: '' };


  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.credentials.email = param['email'];
        this.src = param['src']
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: ICredentials, valid: boolean }) {
    this.needEmailValidation = false;
    this.badLogin = false;
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.email, value.password)
        .subscribe(
          (auth) => {
            if (auth.valid) {
              this.router.navigate(this.src ? [this.src] : ['/'])
            } else if (auth.error === 'Confirm Email') { this.handleConfirmEmail() }
            else if (auth.statusCode == 401) { this.handleBadLogin() }
            else { this.handleGeneralError(auth.statusCode, auth.error) }

            this.isRequesting = false;
          },
          (error: any) => {
            this.alertService.error(error)
            this.isRequesting = false;
            console.log(error)
          })
    }
  }
  handleGeneralError(statusCode: number, error: string) {
    console.log("Unknown login error, status code: " + statusCode + " text: " + error);
    this.alertService.error("Unknown login error.  Please try again later or contact administrator.", false, false)
  }
  handleBadLogin() {
    this.alertService.error("Invalid email or password.  Please try again.", false, false);
    this.badLogin = true;
  }
  handleConfirmEmail() {
    this.alertService.error("Please confirm email before logging in.", false, false);
    this.needEmailValidation = true;
  }
}
