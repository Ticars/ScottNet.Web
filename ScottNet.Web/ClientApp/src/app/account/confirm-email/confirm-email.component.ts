import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private userService: UserService, private route: ActivatedRoute) { }
  public emailConfirmed: boolean = false
 
  ngOnInit() {
    const userId: string = this.route.snapshot.queryParamMap.get('userId')
    const token: string = this.route.snapshot.queryParamMap.get('token');
    if (userId && token) {
      this.userService.confirmEmail(userId, token).subscribe((result) => {
        this.emailConfirmed = true;
      })

    }
  }

}
