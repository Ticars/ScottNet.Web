import { Component, OnInit } from '@angular/core';
import { UserService, AlertService } from '../../shared';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private alertService: AlertService) { }
  public emailConfirmed: boolean = false
 
  ngOnInit() {
    const userId: string = this.route.snapshot.queryParamMap.get('userId')
    const token: string = this.route.snapshot.queryParamMap.get('token');
    if (userId && token) {
      this.userService.confirmEmail(userId, token).subscribe((result) => {
        this.alertService.success("Congratulations, your account has been verified.   Please login!", false, true)
        this.router.navigate(['/login'])
      })
    }
  }

}
