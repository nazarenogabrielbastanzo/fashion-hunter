import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { User } from '../../../../interfaces/user.interface';
import { UserService } from '../../../../services/user.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: User;
  private userId: string;

  constructor(
    private router: Router,
    private loginSvc: LoginService,
    private userSvc: UserService
  ) {
    this.userId = this.loginSvc.getUserId();
  }

  ngOnInit(): void {

    this.userSvc
      .getUserById(this.userId)
      .pipe(
        tap((res: any) => {
          this.user = res.data.user[0];
        })
      )
      .subscribe();
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  logOut() {
    this.loginSvc.logOut();
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }
}
