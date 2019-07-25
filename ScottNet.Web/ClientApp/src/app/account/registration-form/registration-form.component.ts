import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, IUserRegistration } from '../../shared';


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser({ value, valid }: { value: IUserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.email, value.password, value.firstName, value.lastName)
        .subscribe((registration) => {
          if (registration) {
            this.router.navigate(['/login'], { queryParams: { brandNew: true, email: registration.email } });
          }
        },
          (errors) => this.errors = errors,
        () => this.isRequesting = false);
    }
  } 

}

