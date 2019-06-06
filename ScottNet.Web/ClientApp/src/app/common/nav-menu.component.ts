import { Component } from '@angular/core';
import { UserService } from '../shared';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  loggedIn: boolean
  constructor(private userService: UserService) {
    userService.authNavStatus$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn
      console.log("header loggedIn: " + loggedIn)
    });
  }

  logout() {
    this.userService.logout()
  }


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
