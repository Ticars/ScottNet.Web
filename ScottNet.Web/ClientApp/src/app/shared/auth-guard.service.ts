import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { AlertService } from './alert.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: UserService, public router: Router, public alertService: AlertService) { }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.alertService.error('You must log in to access that page.', false, true)
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
