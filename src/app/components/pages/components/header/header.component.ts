import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpConfigService } from '../../../../services/http-config.service';
import { LoginService } from '../../../../services/login.service';
import { User } from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user!: User;

  constructor(
    private router: Router,
    private httpService: HttpConfigService,
    private loginService: LoginService
  ) {
    const userId = this.loginService.getUserId();

    this.httpService
      .get<User>(`${environment.apiUrl}/user/${userId}`, true)
      .subscribe({
        next: (resp: any) => {
          this.user = resp.data.user[0];
        },
        error: (error) => {},
        complete: () => {},
      });
  }

  ngOnInit(): void {}

  goHome(): void {
    this.router.navigate(['/home']);
  }

  logOut() {
    this.loginService.logOut();
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }
}
