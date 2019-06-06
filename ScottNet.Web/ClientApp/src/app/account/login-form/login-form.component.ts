import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, Credentials } from '../../shared';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  src: string = "/"
  credentials: Credentials = { email: '', password: '' };


  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.email = param['email'];
        this.src = param['src']
      });
  }



  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.email, value.password)
        .subscribe(
          (auth) => {
            if (auth) {
              this.router.navigate(this.src ? [this.src] : ['/'])
            } else {
              this.errors = "Invalid username/password"
            }
            this.isRequesting = false;
          },
          (error: any) => {
            this.errors = error
            this.isRequesting = false;
          })
    }
  }
}
